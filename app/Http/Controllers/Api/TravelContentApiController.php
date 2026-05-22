<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Combo;
use App\Models\BookingRequest;
use App\Models\ContactRequest;
use App\Models\Destination;
use App\Models\GalleryItem;
use App\Models\Tour;
use App\Models\TravelService;
use App\Models\TravelVideo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TravelContentApiController extends Controller
{
    public function tours(): JsonResponse
    {
        return response()->json($this->tourPayload());
    }

    public function services(): JsonResponse
    {
        return response()->json(['services' => $this->servicePayload()]);
    }

    public function combos(): JsonResponse
    {
        return response()->json(['combos' => $this->comboPayload()]);
    }

    public function gallery(): JsonResponse
    {
        return response()->json(['gallery' => $this->galleryPayload()]);
    }

    public function videos(): JsonResponse
    {
        return response()->json(['videos' => $this->videoPayload()]);
    }

    public function storeBooking(Request $request): JsonResponse
    {
        $data = $request->validate([
            'type' => 'nullable|in:tour,combo,service',
            'slug' => 'nullable|string|max:255',
            'customer_name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'travel_date' => 'nullable|date',
            'guest_count' => 'nullable|integer|min:1|max:10000',
            'note' => 'nullable|string|max:5000',
        ]);

        $booking = new BookingRequest([
            'customer_name' => $data['customer_name'],
            'phone' => $data['phone'],
            'email' => $data['email'] ?? null,
            'travel_date' => $data['travel_date'] ?? null,
            'guest_count' => $data['guest_count'] ?? null,
            'note' => $data['note'] ?? null,
            'status' => 'new',
        ]);

        if (($data['type'] ?? null) === 'tour') {
            $booking->tour_id = Tour::where('slug', $data['slug'] ?? '')->value('id');
        } elseif (($data['type'] ?? null) === 'combo') {
            $booking->combo_id = Combo::where('slug', $data['slug'] ?? '')->value('id');
        } elseif (($data['type'] ?? null) === 'service') {
            $booking->service_id = TravelService::where('slug', $data['slug'] ?? '')->value('id');
        }

        $booking->save();

        return response()->json([
            'success' => true,
            'id' => $booking->id,
        ], 201);
    }

    public function storeContact(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'nullable|string|max:5000',
        ]);

        $contact = ContactRequest::create([
            'name' => $data['name'],
            'phone' => $data['phone'] ?? null,
            'email' => $data['email'] ?? null,
            'subject' => $data['subject'] ?? null,
            'message' => $data['message'] ?? null,
            'status' => 'new',
        ]);

        return response()->json([
            'success' => true,
            'id' => $contact->id,
        ], 201);
    }

    public function script(string $type): Response
    {
        $payload = match ($type) {
            'tours' => $this->tourPayload(),
            'services' => ['services' => $this->servicePayload()],
            'combos' => ['combos' => $this->comboPayload()],
            'gallery' => ['gallery' => $this->galleryPayload()],
            'videos' => ['videos' => $this->videoPayload()],
            default => abort(404),
        };

        $assignments = collect($payload)
            ->map(fn ($value, $key) => sprintf(
                'window.SaigonData[%s] = %s;',
                json_encode($key),
                json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
            ))
            ->implode("\n");

        return response(
            "window.SaigonData = window.SaigonData || {};\n{$assignments}\n",
            200,
            ['Content-Type' => 'application/javascript; charset=UTF-8']
        );
    }

    private function tourPayload(): array
    {
        $destCfg = Destination::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->mapWithKeys(fn (Destination $destination) => [
                $destination->slug => [
                    'label' => $destination->name,
                    'tag' => $destination->tag,
                    'sub' => $destination->subtitle,
                ],
            ])
            ->all();

        $tours = Tour::query()
            ->with('destination')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn (Tour $tour) => [
                'id' => $tour->slug,
                'dest' => array_values(array_filter([$tour->destination?->slug])),
                'title' => $tour->title,
                'img' => $tour->image_url,
                'imgFb' => 'linear-gradient(135deg,#219EBC,#1B2A4A)',
                'duration' => $tour->duration,
                'filters' => $this->decode($tour->filters),
                'badge' => $tour->badge_text ? [
                    'text' => $tour->badge_text,
                    'type' => $tour->badge_type,
                ] : null,
                'tags' => $this->decode($tour->tags),
                'dep' => $tour->departure,
                'airline' => $tour->transport,
                'dates' => $this->decode($tour->departure_dates),
                'price' => $tour->price ? (float) $tour->price : null,
                'priceText' => $tour->price_text,
            ])
            ->all();

        return [
            'tours' => $tours,
            'destCfg' => $destCfg,
        ];
    }

    private function servicePayload(): array
    {
        return TravelService::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->mapWithKeys(fn (TravelService $service) => [
                $service->slug => [
                    'id' => $service->slug,
                    'name' => $service->name,
                    'badge' => $service->badge,
                    'badgeIcon' => $service->badge_icon,
                    'img' => $service->image_url,
                    'imgFallback' => 'linear-gradient(135deg,#1B2A4A,#E85D04)',
                    'sub' => $service->summary,
                    'qbar' => $this->decode($service->qbar),
                    'desc' => $service->description,
                    'highlights' => $this->decode($service->highlights),
                    'includes' => $this->decode($service->includes),
                    'packages' => $this->decode($service->packages),
                    'process' => $this->decode($service->process),
                    'faq' => $this->decode($service->faq),
                ],
            ])
            ->all();
    }

    private function comboPayload(): array
    {
        return Combo::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get()
            ->mapWithKeys(fn (Combo $combo) => [
                $combo->slug => [
                    'id' => $combo->slug,
                    'name' => $combo->name,
                    'dest' => $combo->destination,
                    'duration' => $combo->duration,
                    'badge' => $combo->badge,
                    'badgeType' => $combo->badge_type,
                    'savePct' => $combo->save_percent,
                    'img' => $combo->image_url,
                    'rating' => $combo->rating ? (float) $combo->rating : null,
                    'reviews' => $combo->review_count,
                    'oldPrice' => $combo->old_price ? (float) $combo->old_price : null,
                    'newPrice' => $combo->new_price ? (float) $combo->new_price : null,
                    'pkgStrip' => $this->decode($combo->pkg_strip),
                    'components' => $this->decode($combo->components),
                    'compareRows' => $this->decode($combo->compare_rows),
                    'itinerary' => $this->decode($combo->itinerary),
                    'reviewList' => $this->decode($combo->reviews),
                ],
            ])
            ->all();
    }

    private function galleryPayload(): array
    {
        return GalleryItem::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn (GalleryItem $item) => [
                'cat' => $this->galleryCategoryKey($item->category),
                'catLabel' => $item->category_label ?: $this->galleryCategoryLabel($item->category),
                'title' => $item->title,
                'src' => $item->image_url,
            ])
            ->all();
    }

    private function galleryCategoryKey(?string $category): ?string
    {
        return match ($category) {
            'Hành Trình', 'hanh-trinh' => 'hanh-trinh',
            'Điểm Đến', 'diem-den' => 'diem-den',
            'TeamBuilding', 'teambuilding' => 'teambuilding',
            'Dịch Vụ', 'Dich Vu', 'dich-vu' => 'dich-vu',
            default => $category,
        };
    }

    private function galleryCategoryLabel(?string $category): ?string
    {
        return match ($this->galleryCategoryKey($category)) {
            'hanh-trinh' => 'Hành Trình',
            'diem-den' => 'Điểm Đến',
            'teambuilding' => 'TeamBuilding',
            'dich-vu' => 'Dịch Vụ',
            default => $category,
        };
    }

    private function videoPayload(): array
    {
        $videos = TravelVideo::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get();

        $mapVideo = fn (TravelVideo $video) => [
            'cat' => $this->videoCategoryKey($video->category),
            'catLabel' => $video->category_label ?: $this->videoCategoryLabel($video->category),
            'title' => $video->title,
            'description' => $video->description,
            'desc' => $video->description,
            'thumb' => $video->thumbnail_url,
            'thumbFb' => 'linear-gradient(135deg,#219EBC,#023047)',
            'src' => $video->is_local ? $video->video_url : $this->youtubeId($video->video_url),
            'local' => $video->is_local,
            'duration' => $video->duration,
            'badge' => $video->badge_text ? [
                'text' => $video->badge_text,
                'type' => $video->badge_type,
            ] : null,
            'views' => $video->views_text,
            'date' => $video->published_text,
        ];

        $featured = $videos->firstWhere('is_featured', true);

        return [
            'featured' => $featured ? $mapVideo($featured) : null,
            'list' => $videos
                ->reject(fn (TravelVideo $video) => $featured && $video->id === $featured->id)
                ->map($mapVideo)
                ->values()
                ->all(),
        ];
    }

    private function videoCategoryKey(?string $category): ?string
    {
        return match ($category) {
            'Tour Nổi Bật', 'Tour Du Lịch', 'tour' => 'tour',
            'TeamBuilding', 'teambuilding' => 'teambuilding',
            'Sự Kiện', 'Su Kien', 'event' => 'event',
            default => $category,
        };
    }

    private function videoCategoryLabel(?string $category): ?string
    {
        return match ($this->videoCategoryKey($category)) {
            'tour' => 'Tour Du Lịch',
            'teambuilding' => 'TeamBuilding',
            'event' => 'Sự Kiện',
            default => $category,
        };
    }

    private function youtubeId(?string $value): ?string
    {
        if (!$value) {
            return null;
        }

        if (preg_match('/^[A-Za-z0-9_-]{11}$/', $value)) {
            return $value;
        }

        if (preg_match('/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/', $value, $matches)) {
            return $matches[1];
        }

        return $value;
    }

    private function decode(?string $value): array
    {
        if (!$value) {
            return [];
        }

        $decoded = json_decode($value, true);

        return is_array($decoded) ? $decoded : [];
    }
}

<?php

namespace Database\Seeders;

use App\Models\Combo;
use App\Models\Destination;
use App\Models\GalleryItem;
use App\Models\Tour;
use App\Models\TravelService;
use App\Models\TravelVideo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class TravelContentSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('seeders/data/travel-content.json');

        if (!file_exists($path)) {
            $this->command?->warn('Travel content JSON not found. Run: node tools/export-travel-data.mjs');
            return;
        }

        $data = json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);

        $this->seedDestinations($data['destCfg'] ?? []);
        $this->seedTours($data['tours'] ?? []);
        $this->seedServices($data['services'] ?? []);
        $this->seedCombos($data['combos'] ?? []);
        $this->seedGallery($data['gallery'] ?? []);
        $this->seedVideos($data['videos'] ?? []);
    }

    private function seedDestinations(array $destinations): void
    {
        foreach ($destinations as $slug => $destination) {
            Destination::updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => $destination['label'] ?? $slug,
                    'tag' => $destination['tag'] ?? null,
                    'subtitle' => $destination['sub'] ?? null,
                    'is_active' => true,
                ]
            );
        }
    }

    private function seedTours(array $tours): void
    {
        foreach ($tours as $index => $tour) {
            $destinationSlug = Arr::first($tour['dest'] ?? []);
            $destinationId = $destinationSlug
                ? Destination::where('slug', $destinationSlug)->value('id')
                : null;

            Tour::updateOrCreate(
                ['slug' => $tour['id']],
                [
                    'destination_id' => $destinationId,
                    'title' => $tour['title'] ?? $tour['id'],
                    'image_url' => $tour['img'] ?? null,
                    'duration' => $tour['duration'] ?? null,
                    'departure' => $tour['dep'] ?? null,
                    'transport' => $tour['airline'] ?? null,
                    'price' => $tour['price'] ?? null,
                    'price_text' => $tour['priceText'] ?? null,
                    'badge_text' => $tour['badge']['text'] ?? null,
                    'badge_type' => $tour['badge']['type'] ?? null,
                    'tags' => $this->json($tour['tags'] ?? []),
                    'filters' => $this->json($tour['filters'] ?? []),
                    'departure_dates' => $this->json($tour['dates'] ?? []),
                    'is_active' => true,
                    'sort_order' => $index,
                ]
            );
        }
    }

    private function seedServices(array $services): void
    {
        $index = 0;

        foreach ($services as $slug => $service) {
            TravelService::updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => $service['name'] ?? $slug,
                    'badge' => $service['badge'] ?? null,
                    'badge_icon' => $service['badgeIcon'] ?? null,
                    'summary' => $service['sub'] ?? null,
                    'description' => $service['desc'] ?? null,
                    'image_url' => $service['img'] ?? null,
                    'qbar' => $this->json($service['qbar'] ?? []),
                    'highlights' => $this->json($service['highlights'] ?? []),
                    'includes' => $this->json($service['includes'] ?? []),
                    'packages' => $this->json($service['packages'] ?? []),
                    'process' => $this->json($service['process'] ?? []),
                    'faq' => $this->json($service['faq'] ?? []),
                    'is_active' => true,
                    'sort_order' => $index++,
                ]
            );
        }
    }

    private function seedCombos(array $combos): void
    {
        $index = 0;

        foreach ($combos as $slug => $combo) {
            Combo::updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => $combo['name'] ?? $slug,
                    'destination' => $combo['dest'] ?? null,
                    'duration' => $combo['duration'] ?? null,
                    'badge' => $combo['badge'] ?? null,
                    'badge_type' => $combo['badgeType'] ?? null,
                    'save_percent' => $combo['savePct'] ?? null,
                    'image_url' => $combo['img'] ?? null,
                    'old_price' => $combo['oldPrice'] ?? null,
                    'new_price' => $combo['newPrice'] ?? null,
                    'rating' => $combo['rating'] ?? null,
                    'review_count' => $combo['reviews'] ?? 0,
                    'pkg_strip' => $this->json($combo['pkgStrip'] ?? []),
                    'components' => $this->json($combo['components'] ?? []),
                    'itinerary' => $this->json($combo['itinerary'] ?? []),
                    'compare_rows' => $this->json($combo['compareRows'] ?? []),
                    'reviews' => $this->json($combo['reviewList'] ?? []),
                    'is_active' => true,
                    'sort_order' => $index++,
                ]
            );
        }
    }

    private function seedGallery(array $items): void
    {
        foreach ($items as $index => $item) {
            GalleryItem::updateOrCreate(
                ['image_url' => $item['src'], 'title' => $item['title']],
                [
                    'category' => $item['cat'] ?? null,
                    'category_label' => $item['catLabel'] ?? null,
                    'is_active' => true,
                    'sort_order' => $index,
                ]
            );
        }
    }

    private function seedVideos(array $videos): void
    {
        $index = 0;

        if (!empty($videos['featured'])) {
            $this->seedVideo($videos['featured'], $index++, true);
        }

        foreach ($videos['list'] ?? [] as $video) {
            $this->seedVideo($video, $index++, false);
        }
    }

    private function seedVideo(array $video, int $sortOrder, bool $featured): void
    {
        TravelVideo::updateOrCreate(
            ['title' => $video['title'], 'video_url' => $video['src']],
            [
                'category' => $video['cat'] ?? null,
                'category_label' => $video['catLabel'] ?? null,
                'description' => $video['description'] ?? $video['desc'] ?? null,
                'thumbnail_url' => $video['thumb'] ?? null,
                'is_local' => $video['local'] ?? false,
                'duration' => $video['duration'] ?? null,
                'badge_text' => $video['badge']['text'] ?? null,
                'badge_type' => $video['badge']['type'] ?? null,
                'views_text' => $video['views'] ?? null,
                'published_text' => $video['date'] ?? null,
                'is_featured' => $featured,
                'is_active' => true,
                'sort_order' => $sortOrder,
            ]
        );
    }

    private function json(array $value): string
    {
        return json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    }
}

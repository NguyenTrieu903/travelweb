<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BookingRequest;
use App\Models\Combo;
use App\Models\ContactRequest;
use App\Models\Destination;
use App\Models\GalleryItem;
use App\Models\Tour;
use App\Models\TravelService;
use App\Models\TravelVideo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'destinations' => Destination::count(),
            'tours' => Tour::count(),
            'services' => TravelService::count(),
            'combos' => Combo::count(),
            'gallery_items' => GalleryItem::count(),
            'videos' => TravelVideo::count(),
            'new_booking_requests' => BookingRequest::where('status', 'new')->count(),
            'new_contact_requests' => ContactRequest::where('status', 'new')->count(),
            'booking_requests' => BookingRequest::count(),
            'contact_requests' => ContactRequest::count(),
        ];

        $latestBookings = BookingRequest::query()
            ->latest()
            ->limit(8)
            ->get();

        $latestContacts = ContactRequest::query()
            ->latest()
            ->limit(8)
            ->get();

        return view('vendor.backpack.crud.operations.dashboard', compact(
            'stats',
            'latestBookings',
            'latestContacts'
        ));
    }

    public function getChartData(Request $request): JsonResponse
    {
        $days = collect(range(6, 0))->map(function (int $daysAgo) {
            $date = now()->subDays($daysAgo);

            return [
                'label' => $date->format('d/m'),
                'bookings' => BookingRequest::whereDate('created_at', $date)->count(),
                'contacts' => ContactRequest::whereDate('created_at', $date)->count(),
            ];
        });

        return response()->json($days);
    }
}


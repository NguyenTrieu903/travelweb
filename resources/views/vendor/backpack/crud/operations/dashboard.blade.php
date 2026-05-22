@extends(backpack_view('blank'))

@section('content')
<style>
    .travel-dashboard .stat-card {
        background: #fff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,.08);
        margin-bottom: 20px;
        min-height: 118px;
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .travel-dashboard .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 22px;
        flex: 0 0 auto;
    }
    .travel-dashboard .stat-number {
        font-size: 28px;
        font-weight: 800;
        line-height: 1;
        margin-bottom: 6px;
    }
    .travel-dashboard .stat-label {
        color: #687385;
        font-size: 14px;
    }
    .travel-dashboard .panel {
        background: #fff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,.08);
        margin-bottom: 20px;
    }
    .travel-dashboard .panel-title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 14px;
    }
    .travel-dashboard .request-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid #eef1f5;
    }
    .travel-dashboard .request-row:last-child {
        border-bottom: 0;
    }
    .travel-dashboard .muted {
        color: #687385;
        font-size: 13px;
    }
    .bg-travel-blue { background: linear-gradient(135deg, #1b6fd8, #22a3c7); }
    .bg-travel-green { background: linear-gradient(135deg, #138a64, #37b37e); }
    .bg-travel-orange { background: linear-gradient(135deg, #e85d04, #f59e0b); }
    .bg-travel-purple { background: linear-gradient(135deg, #6d5dfc, #9b5de5); }
</style>

<div class="travel-dashboard">
    <div class="row">
        <div class="col-lg-3 col-md-6">
            <a href="{{ backpack_url('tour') }}" class="text-decoration-none text-reset">
                <div class="stat-card">
                    <div class="stat-icon bg-travel-blue"><i class="la la-route"></i></div>
                    <div>
                        <div class="stat-number">{{ number_format($stats['tours']) }}</div>
                        <div class="stat-label">Tours</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-lg-3 col-md-6">
            <a href="{{ backpack_url('travel-service') }}" class="text-decoration-none text-reset">
                <div class="stat-card">
                    <div class="stat-icon bg-travel-green"><i class="la la-concierge-bell"></i></div>
                    <div>
                        <div class="stat-number">{{ number_format($stats['services']) }}</div>
                        <div class="stat-label">Services</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-lg-3 col-md-6">
            <a href="{{ backpack_url('combo') }}" class="text-decoration-none text-reset">
                <div class="stat-card">
                    <div class="stat-icon bg-travel-orange"><i class="la la-tags"></i></div>
                    <div>
                        <div class="stat-number">{{ number_format($stats['combos']) }}</div>
                        <div class="stat-label">Combos</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-lg-3 col-md-6">
            <a href="{{ backpack_url('booking-request') }}" class="text-decoration-none text-reset">
                <div class="stat-card">
                    <div class="stat-icon bg-travel-purple"><i class="la la-calendar-check"></i></div>
                    <div>
                        <div class="stat-number">{{ number_format($stats['new_booking_requests']) }}</div>
                        <div class="stat-label">New Booking Requests</div>
                    </div>
                </div>
            </a>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-3 col-md-6">
            <a href="{{ backpack_url('destination') }}" class="text-decoration-none text-reset">
                <div class="stat-card">
                    <div class="stat-icon bg-travel-blue"><i class="la la-map-marker"></i></div>
                    <div>
                        <div class="stat-number">{{ number_format($stats['destinations']) }}</div>
                        <div class="stat-label">Destinations</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-lg-3 col-md-6">
            <a href="{{ backpack_url('gallery-item') }}" class="text-decoration-none text-reset">
                <div class="stat-card">
                    <div class="stat-icon bg-travel-green"><i class="la la-images"></i></div>
                    <div>
                        <div class="stat-number">{{ number_format($stats['gallery_items']) }}</div>
                        <div class="stat-label">Gallery Items</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-lg-3 col-md-6">
            <a href="{{ backpack_url('travel-video') }}" class="text-decoration-none text-reset">
                <div class="stat-card">
                    <div class="stat-icon bg-travel-orange"><i class="la la-video"></i></div>
                    <div>
                        <div class="stat-number">{{ number_format($stats['videos']) }}</div>
                        <div class="stat-label">Videos</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-lg-3 col-md-6">
            <a href="{{ backpack_url('contact-request') }}" class="text-decoration-none text-reset">
                <div class="stat-card">
                    <div class="stat-icon bg-travel-purple"><i class="la la-envelope"></i></div>
                    <div>
                        <div class="stat-number">{{ number_format($stats['new_contact_requests']) }}</div>
                        <div class="stat-label">New Contact Requests</div>
                    </div>
                </div>
            </a>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-6">
            <div class="panel">
                <div class="panel-title">Latest Booking Requests</div>
                @forelse($latestBookings as $booking)
                    <div class="request-row">
                        <div>
                            <div><strong>{{ $booking->customer_name }}</strong></div>
                            <div class="muted">{{ $booking->phone }}{{ $booking->travel_date ? ' · ' . $booking->travel_date->format('d/m/Y') : '' }}</div>
                        </div>
                        <a href="{{ backpack_url('booking-request/'.$booking->id.'/show') }}">View</a>
                    </div>
                @empty
                    <div class="muted">No booking requests yet.</div>
                @endforelse
            </div>
        </div>
        <div class="col-lg-6">
            <div class="panel">
                <div class="panel-title">Latest Contact Requests</div>
                @forelse($latestContacts as $contact)
                    <div class="request-row">
                        <div>
                            <div><strong>{{ $contact->name }}</strong></div>
                            <div class="muted">{{ $contact->phone ?: $contact->email }}{{ $contact->subject ? ' · ' . $contact->subject : '' }}</div>
                        </div>
                        <a href="{{ backpack_url('contact-request/'.$contact->id.'/show') }}">View</a>
                    </div>
                @empty
                    <div class="muted">No contact requests yet.</div>
                @endforelse
            </div>
        </div>
    </div>
</div>
@endsection


{{-- This file is used for menu items by any Backpack v6 theme --}}
<style>
    .nav-item.dropdown .dropdown-menu {
        border: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        margin-top: 5px;
    }

    .nav-item.dropdown .dropdown-item {
        padding: 8px 16px;
        transition: all 0.3s ease;
    }

    .nav-item.dropdown .dropdown-item:hover {
        background-color: #f8f9fa;
        color: #007bff;
    }

    .nav-icon {
        margin-right: 8px;
        width: 16px;
        text-align: center;
    }

    .nav-link:hover {
        background-color: rgba(0, 123, 255, 0.05);
        border-radius: 4px;
    }
</style>

<li class="nav-item">
    <a class="nav-link" href="{{ backpack_url('dashboard') }}">
        <i class="la la-home nav-icon"></i> Dashboard
    </a>
</li>

<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="travelContentDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="la la-map-marked nav-icon"></i> Travel Content
    </a>
    <ul class="dropdown-menu" aria-labelledby="travelContentDropdown">
        <li><a class="dropdown-item" href="{{ backpack_url('destination') }}"><i class="la la-map-marker nav-icon"></i> Destinations</a></li>
        <li><a class="dropdown-item" href="{{ backpack_url('tour') }}"><i class="la la-route nav-icon"></i> Tours</a></li>
        <li><a class="dropdown-item" href="{{ backpack_url('travel-service') }}"><i class="la la-concierge-bell nav-icon"></i> Services</a></li>
        <li><a class="dropdown-item" href="{{ backpack_url('combo') }}"><i class="la la-tags nav-icon"></i> Combos</a></li>
        <li><a class="dropdown-item" href="{{ backpack_url('gallery-item') }}"><i class="la la-images nav-icon"></i> Gallery</a></li>
        <li><a class="dropdown-item" href="{{ backpack_url('travel-video') }}"><i class="la la-video nav-icon"></i> Videos</a></li>
    </ul>
</li>

<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="travelRequestsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="la la-inbox nav-icon"></i> Travel Requests
    </a>
    <ul class="dropdown-menu" aria-labelledby="travelRequestsDropdown">
        <li><a class="dropdown-item" href="{{ backpack_url('booking-request') }}"><i class="la la-calendar-check nav-icon"></i> Booking Requests</a></li>
        <li><a class="dropdown-item" href="{{ backpack_url('contact-request') }}"><i class="la la-envelope nav-icon"></i> Contact Requests</a></li>
    </ul>
</li>


<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Housemates\ConnectApi\Filters\RoomFilter;

class RoomResultsInput extends FormRequest
{
    public function rules()
    {
        return [
            'min_price' => 'integer|min:0|max:1000',
            'max_price' => 'integer|min:0|max:1000',
            'amenities.*' => 'string',
            'date' => 'string',
            'page' => 'integer'
        ];
    }

    public function toRoomFilter(): RoomFilter {
        $filter = new RoomFilter;
        $filter->setPageFilter($this->input('page', 1));

        if ($this->has(['min_price', 'max_price'])) {
            $priceFilter = sprintf('[min=%s,max=%s]', $this->input('min_price'), $this->input('max_price'));
            $filter->setPriceRangeFilter($priceFilter);
        }

        $amenities = json_decode($this->input('amenities', '[]'));
        if (!empty($amenities)) {
            $amenityFilter = '[' . implode('.', array_map(fn($x) => $x . '=true', $amenities)) . ']';
            $filter->setAmenitiesFilter($amenityFilter);
        }

        if ($this->has('date')) {
            $filter->setMoveInDateFilter($this->input('date'));
        }

        return $filter;
    }
}


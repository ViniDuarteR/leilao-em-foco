<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Auction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class AdminAuctionController extends Controller
{
    public function index(): JsonResponse
    {
        $this->authorize('viewAny', Auction::class);

        $auctions = Auction::with(['lots', 'auctioneer'])
            ->latest()
            ->paginate(20);

        return response()->json($auctions);
    }

    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', Auction::class);

        $validatedData = $request->validate([
            'user_id' => [
                'required',
                Rule::exists('users', 'id')->where('user_type', 'Leiloeiro')
            ],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_time' => ['required', 'date', 'after:now'],
            'end_time' => ['required', 'date', 'after:start_time'],
        ]);

        $auction = Auction::create($validatedData);

        return response()->json($auction, 201);
    }

    public function show(Auction $auction): JsonResponse
    {
        $this->authorize('view', $auction);

        $auction->load(['lots', 'auctioneer']);
        return response()->json($auction);
    }

    public function update(Request $request, Auction $auction): JsonResponse
    {
        $this->authorize('update', $auction);

        $validatedData = $request->validate([
            'user_id' => [
                'sometimes',
                'required',
                'integer',
                Rule::exists('users', 'id')->where('user_type', 'Leiloeiro')
            ],
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_time' => ['sometimes', 'required', 'date'],
            'end_time' => ['sometimes', 'required', 'date', 'after:start_time'],
            'status' => ['sometimes', 'required', 'string', Rule::in(['pending', 'active', 'finished', 'cancelled'])]
        ]);

        $auction->update($validatedData);

        return response()->json($auction->load(['lots', 'auctioneer']));
    }

    public function destroy(Auction $auction): JsonResponse
    {
        $this->authorize('delete', $auction);

        $auction->delete();

        return response()->json(null, 204);
    }
}

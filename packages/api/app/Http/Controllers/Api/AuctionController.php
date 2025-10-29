<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Auction;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AuctionController extends Controller
{
    public function index(Request $request): JsonResponse
    {

        $user = $request->user();
        $query = Auction::with(['lots', 'auctioneer']);

        if ($user->user_type === 'Leiloeiro') {
            $auctions = $query->where('user_id', $user->id)
                ->latest()
                ->paginate(20);
        } else {
            $auctions = $query->where('status', 'active')
                ->latest()
                ->paginate(20);
        }

        return response()->json($auctions);
    }

    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', Auction::class);

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_time' => ['required', 'date', 'after:now'],
            'end_time' => ['required', 'date', 'after:start_time'],
        ]);

        $auction = $request->user()->auctions()->create($validatedData);

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
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_time' => ['sometimes', 'required', 'date', 'after_or_equal:now'],
            'end_time' => ['sometimes', 'required', 'date', 'after:start_time'],
            'status' => ['sometimes', 'required', 'string', \Illuminate\Validation\Rule::in(['pending', 'active', 'finished', 'cancelled'])]
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

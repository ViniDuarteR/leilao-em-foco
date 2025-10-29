<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Auction;
use App\Models\Lot;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class LotController extends Controller
{
    public function index(Auction $auction): JsonResponse
    {
        $this->authorize('viewAny', Lot::class);

        $lots = $auction->lots()
            ->with('category')
            ->paginate(20);

        return response()->json($lots);
    }

    public function store(Request $request, Auction $auction): JsonResponse
    {
        $this->authorize('create', [Lot::class, $auction]);

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'start_bid' => ['required', 'numeric', 'min:0'],
            'min_increment' => ['nullable', 'numeric', 'min:0.01'],
            'status' => ['nullable', 'string', Rule::in(['available', 'sold', 'withdrawn'])]
        ]);

        $lot = $auction->lots()->create($validatedData);

        return response()->json($lot, 201);
    }

    public function show(Lot $lot): JsonResponse
    {
        $this->authorize('view', $lot);

        $lot->load(['category', 'auction.auctioneer']);

        return response()->json($lot);
    }

    public function update(Request $request, Lot $lot): JsonResponse
    {
        $this->authorize('update', $lot);

        $validatedData = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category_id' => ['sometimes', 'required', 'integer', 'exists:categories,id'],
            'start_bid' => ['sometimes', 'required', 'numeric', 'min:0'],
            'min_increment' => ['nullable', 'numeric', 'min:0.01'],
            'status' => ['sometimes', 'required', 'string', Rule::in(['available', 'sold', 'withdrawn'])]
        ]);

        $lot->update($validatedData);

        return response()->json($lot->load(['category', 'auction']));
    }

    public function destroy(Lot $lot): JsonResponse
    {
        $this->authorize('delete', $lot);

        $lot->delete();

        return response()->json(null, 204);
    }
}

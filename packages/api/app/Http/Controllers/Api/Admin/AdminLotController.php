<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lot;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class AdminLotController extends Controller
{
    public function index(): JsonResponse
    {
        $this->authorize('viewAny', Lot::class);

        $lots = Lot::with(['category', 'auction.auctioneer'])
            ->latest()
            ->paginate(20);

        return response()->json($lots);
    }

    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', Lot::class);

        $validatedData = $request->validate([
            'auction_id' => ['required', 'integer', 'exists:auctions,id'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_bid' => ['required', 'numeric', 'min:0'],
            'min_increment' => ['nullable', 'numeric', 'min:0.01'],
            'status' => ['nullable', 'string', Rule::in(['available', 'sold', 'withdrawn'])]
        ]);

        $lot = Lot::create($validatedData);

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
            'auction_id' => ['sometimes', 'required', 'integer', 'exists:auctions,id'],
            'category_id' => ['sometimes', 'required', 'integer', 'exists:categories,id'],
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'start_bid' => ['sometimes', 'required', 'numeric', 'min:0'],
            'min_increment' => ['nullable', 'numeric', 'min:0.01'],
            'status' => ['sometimes', 'required', 'string', Rule::in(['available', 'sold', 'withdrawn'])]
        ]);
        $lot->update($validatedData);

        return response()->json($lot->load(['category', 'auction.auctioneer']));
    }

    public function destroy(Lot $lot): JsonResponse
    {
        $this->authorize('delete', $lot);

        $lot->delete();

        return response()->json(null, 204);
    }
}

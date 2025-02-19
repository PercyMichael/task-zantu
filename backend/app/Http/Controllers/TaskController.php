<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Get all tasks
    public function index(Request $request)
    {
        // Get the currently authenticated user
        $user = $request->user();

        // Fetch tasks created by the authenticated user and eager load the assignee relationship
        $tasks = Task::where('user_id', $user->id)
            ->with('assignee') // Eager load the assignee relationship (optional, depending on your need)
            ->select('id', 'name', 'completed', 'due_date', 'description', 'assignee_id') // Pick the fields you want
            ->get();

        return response()->json($tasks);
    }


    // Store a new task
    public function store(Request $request)
    {
        $user = $request->user(); // Get the authenticated user

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'completed' => 'boolean',
            'completed_at' => 'nullable|date',
            'due_date' => 'nullable|date',
            'description' => 'nullable|string',
            'assignee_id' => 'nullable|integer|exists:users,id',
        ]);

        // Assign the user_id automatically
        $validated['user_id'] = $user->id;

        $task = Task::create($validated);

        return response()->json($task, 201);
    }


    // Get a single task
    public function show($id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        return response()->json($task);
    }

    // Update a task
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->update($request->all());
        return response()->json($task);
    }

    // Delete a task
    public function destroy($id, Request $request)
    {
        // Find the task by its ID
        $task = Task::find($id);

        // Get the currently authenticated user
        $user = $request->user();

        // If the task is not found, return a 404 response
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        // Check if the task belongs to the current user
        if ($task->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete the task
        $task->delete();

        // Return a success message
        return response()->json(['message' => 'Task deleted successfully']);
    }
}

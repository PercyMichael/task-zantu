<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $guarded = [];

    /**
     * Get the user that owns the task (creator).
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id'); // 'user_id' is the foreign key in 'tasks' table
    }

    /**
     * Get the user that is assigned to the task (assignee).
     */
    public function assignee()
    {
        return $this->belongsTo(User::class, 'assignee_id'); // 'assignee_id' is the foreign key in 'tasks' table
    }
}

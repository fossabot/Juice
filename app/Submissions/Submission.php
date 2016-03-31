<?php

namespace App\Submissions;

use App\Core\Entity;
use App\Judges\Judge;
use App\Questions\Question;
use Carbon\Carbon;

class Submission extends Entity
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['user_id', 'question_id'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['judging'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['submitted_at'];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['judge'];

    /**
     * Get the judging status.
     *
     * @return bool
     */
    public function getJudgingAttribute()
    {
        return is_null($this->getRelation('judge'));
    }

    /**
     * Submission 的題目.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * Submission 的 judge 結果.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function judge()
    {
        return $this->hasOne(Judge::class);
    }

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function (Submission $submission) {
            $submission->setAttribute('submitted_at', Carbon::now());
        });
    }
}
<?php

$factory->define(App\Accounts\User::class, function (Faker\Generator $faker) {
    return [
        'username' => $faker->userName,
        'password' => bcrypt(str_random(10)),
        'nickname' => $faker->name,
        'email' => $faker->email,
    ];
});

$factory->define(App\Questions\Question::class, function (Faker\Generator $faker) {
    return [
        'title' => $faker->sentence,
        'description' => $faker->paragraph,
        'test_data' => $faker->sentence,
        'restriction' => [
            'time' => $faker->randomFloat(null, 1.0, 10.0),
            'memory' => $faker->randomFloat(null, 1.0, 100.0),
            'file' => $faker->numberBetween(0, 10),
            'library' => $faker->randomElement(['strstr', 'strlen', 'malloc']),
        ],
        'public' => $faker->boolean(),
    ];
});

$factory->define(App\Submissions\Submission::class, function (Faker\Generator $faker) {
    return [
        'user_id' => \App\Accounts\User::all(['id'])->random()->getAttribute('id'),
        'question_id' => \App\Questions\Question::all(['id'])->random()->getAttribute('id'),
        'code' => $faker->paragraph,
        'submitted_at' => $faker->dateTime,
    ];
});

$factory->define(App\Judges\Judge::class, function (Faker\Generator $faker) {
    return [
        'result' => $faker->randomElement(['AC', 'WA', 'SE', 'CE', 'RE', 'TLE', 'MLE', 'EOF']),
        'compiled_info' => $faker->boolean() ? $faker->sentence : null,
        'time' => $faker->randomFloat(null, 1.0, 10.0),
        'memory' => $faker->randomFloat(null, 1.0, 100.0),
        'file' => $faker->numberBetween(0, 10),
        'judged_at' => $faker->dateTime,
    ];
});

<?php

namespace Database\Factories;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AttendanceFactory extends Factory
{
    protected $model = Attendance::class;

    public function definition(): array
    {
        return [
            'request_date' => $this->faker->date(),
            'name' => $this->faker->name(),
            'requester_name' => $this->faker->name(),
            'priority_level' => $this->faker->randomElement(['01', '02', '03', '04']),
            'phone' => $this->faker->numerify('###########'), // 11 dígitos
            'address' => $this->faker->address(),
            'operator_id' => User::factory(),
        ];
    }
}

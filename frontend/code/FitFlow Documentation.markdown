# FitFlow Project Documentation

## General Objective
Create a fitness app that provides personalized diet and exercise recommendations using AI, adapting in real-time to the user’s progress.

## MVP - Basic Functionalities

### 1. User Registration and Initial Data
- Collect user details: age, height, weight, gender, physical activity level, dietary preferences.

### 2. Recommendation Engine (AI)
- **Initial Approach**: Utilize a robust and tested AI, such as the OpenAI API, for recommendations.
- **Future Plan**: If time permits, train and implement a model using TensorFlow or Scikit-Learn, then export it to TensorFlow Lite for on-device execution.
- The model takes user data and generates a tailored diet and exercise plan based on their goals.

### 3. Progress Tracking
- Users update their weight and activity level daily/weekly.
- The model adjusts recommendations daily/weekly based on progress.

### 4. Interface
- Displays daily diet, suggested exercises, and progress statistics.
- Includes a daily/weekly progress graph.

## Technical Stack
- **Backend**: Django + Django REST Framework (DRF)
- **Database**: PostgreSQL
- **Authentication**: Simple token with DRF or JWT (djangorestframework-simplejwt)
- **Frontend**: React (assumed based on context clues, as "2224" seems erroneous)
- **AI/Recommender**: OpenAI API, with potential for a custom-trained model

## Data Models

### CustomUser
```python
class CustomUser(AbstractUser):
    name = models.CharField()
    email = models.EmailField()
    password = models.CharField()
    age = models.IntegerField()
    sex = models.CharField(max_length=1, choices=[('M', 'Male'), ('F', 'Female')])
    height_cm = models.FloatField()
    weight_kg = models.FloatField()
    activity_level = models.CharField(max_length=20, choices=ACTIVITY_LEVELS, default="sedentary")
    dietary_restrictions = MultiSelectField(choices=DIETARY_RESTRICTIONS)
    goal = models.CharField(max_length=20, choices=GOALS, default="maintain_weight")
    accept_terms = models.BooleanField(default=False)
```

#### Choices
```python
DIETARY_RESTRICTIONS = [
    ("vegan", "Vegana"),
    ("vegetarian", "Vegetariana"),
    ("gluten_free", "Sin gluten"),
    ("lactose_free", "Sin lactosa"),
    ("low_carb", "Baja en carbohidratos"),
    ("keto", "Keto"),
    ("paleo", "Paleo"),
    ("halal", "Halal"),
    ("kosher", "Kosher"),
    ("nut_free", "Sin frutos secos"),
    ("none", "Sin restricciones"),
]

GOALS = [
    ("lose_weight", "Perder peso"),
    ("gain_muscle", "Ganar músculo"),
    ("maintain_weight", "Mantener peso"),
    ("improve_endurance", "Mejorar resistencia"),
    ("increase_flexibility", "Aumentar flexibilidad"),
    ("boost_energy", "Aumentar energia"),
    ("reduce_stress", "Reducir estrés"),
]

ACTIVITY_LEVELS = [
    ("sedentary", "Sedentary"),
    ("light", "Lightly Active"),
    ("moderate", "Moderately Active"),
    ("active", "Active"),
    ("very_active", "Very Active"),
]
```

### MealPlan
```python
class MealPlan(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField()
    meals = models.JSONField()  # {"breakfast": [...], "lunch": [...], ...}
```

### WorkoutPlan
```python
class WorkoutPlan(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField()
    exercises = models.JSONField()  # [{"name": "push-up", "reps": 10}, ...]
```

### DailyProgress
```python
class DailyProgress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    recommended_meals = models.JSONField()
    recommended_workout = models.JSONField()
    meals_followed = models.BooleanField(default=False)
    workout_done = models.BooleanField(default=False)
    weight_kg = models.FloatField(null=True, blank=True)
    mood = models.IntegerField(null=True, blank=True)  # 1-5
    feedback = models.CharField()
    
    class Meta:
        unique_together = ('user', 'date')
```

### PlanChange
```python
class PlanChange(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    change = models.CharField(max_length=20, choices=CHANGE_TYPES)
    previous = models.CharField(max_length=20)
    new = models.CharField(max_length=20)
    timestamp = models.DateTimeField(auto_now_add=True)

CHANGE_TYPES = [
    ("activity", "Nivel de actividad"),
    ("dietary", "Restricción de alimentación"),
    ("goal", "Meta"),
]
```

## API Endpoints

| Method | Endpoint            | Description                             |
|--------|---------------------|-----------------------------------------|
| POST   | /api/register/      | Create a new user                      |
| POST   | /api/login/         | User authentication                    |
| GET    | /api/profile/       | View user profile                      |
| PUT    | /api/profile/       | Edit user profile                      |
| GET    | /api/plan/          | Get daily plan (diet + exercise)       |
| POST   | /api/feedback/:id   | Submit feedback for the day            |
| GET    | /api/history/       | View weekly/monthly history            |

## Recommendation Engine
```python
def generar_plan(user: CustomUser):
    # Calculate BMI
    bmi = calculate_bmi(user)
    # Generate plan with AI
    meal_plan = generar_plan_comidas()
    workout_plan = generar_plan_ejercicios()
    return meal_plan, workout_plan
```
- Save plans to the database and serve via the `/api/plan/` endpoint.
- If BMI < 18.5 or > 30, display an alert recommending a doctor’s visit alongside the recommendations.

## User Stories

### User Registration
- Users register by filling out all `CustomUser` fields.
- Must accept terms acknowledging AI-generated recommendations and advise consulting a doctor for health issues.

### Request Recommendations
- Registered users log in and request a daily plan via `/api/plan/`.
- Plans are displayed and saved to the user’s history.
- If no `DailyProgress` exists for the day, one is created with recommended plans.

### Track Progress
- Save recommended plans, actual actions, and user feedback for tracking and future AI improvements.
- Users update `DailyProgress` with what they actually did (e.g., at day’s end or via feedback).
- When users log weight, update the profile’s weight.

### View History
- GET `/api/history/` returns the last 7-30 `DailyProgress` entries, including weight, compliance, and feedback.

### Change Plan
- Users can change goals (e.g., from “lose weight” to “gain muscle”), activity level, or dietary preferences.
- Track changes in the `PlanChange` model for future AI training or behavior analysis.

## Frontend - UX/UI

### Design Choices
- Select a color palette.
- Choose a template.
- Create a FitFlow logo.

### Homepage
- Simple design with images and text about FitFlow, healthy eating, and exercise.
- Includes a “Start Using FitFlow” button linking to registration.
- **Navbar**: Home, About, Services, Log In, Register, Contact.

### Forms
- **Register Form**: Collects all `CustomUser` fields.
- **Login Form**.
- **Edit Profile Form**: Similar to the register form.
- **Feedback Form** (if time permits): Allows users to provide daily feedback.

### User Dashboard
- **Sidebar**:
  - Home
  - Profile
  - Your Plans
  - Your Progress
- **Dashboard Sections**:
  - **Home**: Displays user name, training goal, and date. Shows the daily plan (exercises, meals, tips) if generated, or a “Generate Daily Plan” button. Shows a loading message (“...generating plan...”) while fetching the plan.
  - **Profile**: Displays and allows editing of user data.
  - **Your Plans**: Lists historical plans by date (as a list or cards). Plans are clickable to view details. If time permits, add an “Add/Edit Feedback” option in the detailed view for users to log compliance, weight, mood (1-5), and comments.
  - **Your Progress**: Displays weight and BMI graphs over a user-selected period (7, 30, 45, 60, or 90 days). Optionally, move this to the Home section and remove from the sidebar.
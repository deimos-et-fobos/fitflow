import json
from openai import AzureOpenAI
from django.conf import settings


def create_prompt(user):

    # days = int(self.request.query_params.get('days', 7))
    # start_date = timezone.now().date() - timedelta(days=days)
    # plans = Plan.objects.filter(user=user, date__gte=start_date).order_by('-date')

    prompt = f"""
        {{
            "user_profile": {{
                "age": {user.age},
                "sex": "{user.sex}",
                "height_cm": {user.height_cm},
                "weight_kg": {user.weight_kg},
                "activity_level": "{user.activity_level}",
                "goal": "{user.goal}",
                "diet_restrictions": {user.dietary_restrictions},
                "bmi": {user.weight_kg / ((user.height_cm / 100) ** 2)}
            }},

        }}

        Usá la información del perfil, historial y feedback del usuario para generar una recomendación diaria de alimentación y ejercicios. 
        Adaptá el contenido para ayudar a alcanzar el objetivo (goal). 
        Respondé en este formato: 
        "output_format": "json_v2"
        {{
            "meals": {{
                "breakfast": {{"08:00": [...]}},
                ...
            }},
            "workouts": {{
                "duration": "xx min", around 60min
                "warmup": "...",
                "exercises": {{"push-up": "10x4", ...}}, entre 5 y 7 ejercicios
                "stretching": "..."
            }},
            "tips": ["...", "..."] entre 0 y 2 tips
        }}
    """
            # "history": {{
            #     "weight_kg": {user.weight_history},  
            #     "dates": {user.date_history}
            # }},
            # "feedback": {user.feedback}

    return prompt



def generate_plan(user):
    prompt = create_prompt(user)
    print(prompt)

    client = AzureOpenAI(
        api_key = settings.OPENAI_API_KEY1,  
        api_version = "2025-03-01-preview",
        azure_endpoint = settings.OPENAI_API_URL
    )

    response = client.chat.completions.create(
        model="gpt-4o-mini",  # o el nombre del deployment si usás Azure
        response_format={ "type": "json_object" },
        messages=[
            {"role": "developer", "content": "Eres un entrenador personal."},
            {"role": "user", "content": prompt}
        ],
        max_completion_tokens = 5000,
    )
    
    print(response.model_dump_json(indent=2))

    plan = response.choices[0].message.content
    print(plan)   

    return json.loads(plan)
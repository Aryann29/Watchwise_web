from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)

tmdb_api_key = ''

def get_movie_details(movie_name):
    api_url = f'https://api.themoviedb.org/3/search/movie?api_key={tmdb_api_key}&query={movie_name}'
    response = requests.get(api_url)
    movie_details = json.loads(response.text)

    if 'results' in movie_details and len(movie_details['results']) > 0:
        movie = movie_details['results'][0]
        return movie
    else:
        return None

def get_imdb_rating(movie_name):
    movie = get_movie_details(movie_name)

    if movie:
        if movie['vote_average']:
            return  f"The IMDb rating of '{movie_name}' is {movie['vote_average']}."
    else:
        return 'rating dosent exist'

def get_release_date(movie_name):
    movie = get_movie_details(movie_name)
    if movie:
        if movie['release_date']:
            return f"The movie '{movie_name}' was released on {movie['release_date']}." 
    else:
        return 'release data not found'

def get_director(movie_name):
    movie = get_movie_details(movie_name)
    if movie:
        movie_id = movie['id']
        details_api_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_api_key}&append_to_response=credits'
        details_response = requests.get(details_api_url)
        details_data = json.loads(details_response.text)

        credits = details_data.get('credits', {})
        crew = credits.get('crew', [])
        director = next((person['name'] for person in crew if person['job'] == 'Director'), 'Unknown')
        return f"Sure, the movie '{movie_name}' is directed by '{director}"
    else:
        return None

def get_actors(movie_name):
    movie = get_movie_details(movie_name)
    if movie:
        movie_id = movie['id']
        details_api_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_api_key}&append_to_response=credits'
        details_response = requests.get(details_api_url)
        details_data = json.loads(details_response.text)

        credits = details_data.get('credits', {})
        cast = credits.get('cast', [])
        actors = [person['name'] for person in cast[:5]]
        actor_names = ", ".join(actors)
        return f"The actors in the movie '{movie_name}' are: {actor_names}"
    else:
        return None
    
    
def get_writers(movie_name):
    movie = get_movie_details(movie_name)
    if movie:
        movie_id = movie['id']
        details_api_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_api_key}&append_to_response=credits'
        details_response = requests.get(details_api_url)
        details_data = json.loads(details_response.text)
        credits = details_data.get('credits', {})
        crew = credits.get('crew', [])
        writers = [person['name'] for person in crew if person['department'] == 'Writing']
        return f"The writers of '{movie_name}' are: {', '.join(writers)}."
        
    else:
        return "Movie not found."

def get_overview(movie_name):
    movie = get_movie_details(movie_name)
    if movie:
        movie_id = movie['id']
        details_api_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_api_key}'
        details_response = requests.get(details_api_url)
        movie_details = json.loads(details_response.text)
        overview = movie_details['overview']
        return f"Here's a brief overview of '{movie_name}':\n\n{overview}"

def get_runtime(movie_name):
    movie = get_movie_details(movie_name)
    if movie:
        movie_id = movie['id']
        details_api_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_api_key}'
        details_response = requests.get(details_api_url)
        movie_details = json.loads(details_response.text)
        runtime = movie_details['runtime']
        if runtime:
            return f"The runtime of '{movie_name}' is {runtime} minutes."
        else:
            return f"No runtime information found for '{movie_name}'."
    
    else:
        return "Movie not found."
    
def get_languages(movie_name):
    movie = get_movie_details(movie_name)
    if movie:
        movie_id = movie['id']
        details_api_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_api_key}'
        details_response = requests.get(details_api_url)
        movie_details = json.loads(details_response.text)
        languages = [lang['name'] for lang in movie_details['spoken_languages']]
        if languages:
            limited_languages = languages[:4]  # Limit to 4 languages
            return f"The available languages for '{movie_name}' are: {', '.join(limited_languages)}"
    
    else:
        return "Movie not found."
    


def get_similar_movies(movie_name):
    movie = get_movie_details(movie_name)
    if movie:
        movie_id = movie['id']
        url = f"https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key={tmdb_api_key}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            similar_movies = [movie['title'] for movie in data['results'][:5]]  # Get the top 5 similar movies
            movie_list = "\n".join([f"{i+1}. {movie}" for i, movie in enumerate(similar_movies)])
            response_text = f"For the movie '{movie_name}', here are some similar movies you might like:\n{movie_list}. Enjoy!"
            return response_text
        else:
            return 'Similar movies not found.'
    else:
        return 'Movie not found.'
    
def get_movie_details_response(movie_name):
    movie = get_movie_details(movie_name)
    if movie:
        title = movie['title']
        overview = movie['overview']
        release_date = movie['release_date']
        director = get_director(movie_name)
        actors = get_actors(movie_name)
        response_text = f"Sure, the movie '{title}' is directed by '{director}'. The main cast includes: {''.join(actors)}. Here's a brief overview: {overview}. It was released on {release_date}."
        return response_text
    else:
        return 'Movie not found.'
    

def get_reviews(movie_name):
    movie = get_movie_details(movie_name)
    if movie:
        movie_id = movie['id']
        # Replace with your actual API key
        url = f'https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key={tmdb_api_key}'
        
        response = requests.get(url)
        data = response.json()
        
        reviews = []
    
        if 'results' in data:
            results = data['results']
            
            for review in results:
                content = review['content']
                reviews.append(content)
                
                # Break the loop if two reviews are retrieved
                if len(reviews) == 2:
                    break
        
        return reviews
    
    return None


def get_movie_recommendations(genre_name):
    genre_ids = {
        'action': 28,
        'adventure': 12,
        'animation': 16,
        'comedy': 35,
        'crime': 80,
        'documentary': 99,
        'drama': 18,
        'family': 10751,
        'fantasy': 14,
        'horror': 27,
        'mystery': 9648,
        'romance': 10749,
        'science fiction': 878,
        'thriller': 53,
        'war': 10752,
        'western': 37
    }

    genre_name_lower = genre_name.lower()
    genre_id = genre_ids.get(genre_name_lower)

    if genre_id is None:
        return "Invalid genre. Please try again with a valid genre."

    # Replace 'YOUR_API_KEY' with your actual TMDb API key


    # Construct the API endpoint URL for movie recommendations based on genre
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={tmdb_api_key}&with_genres={genre_id}"

    try:
        # Send a GET request to the API endpoint
        response = requests.get(url)
        data = response.json()

        if 'results' in data:
            movies = data['results']
            if movies:
                # Randomly select a subset of recommended movies (e.g., 5 movies)
                recommended_movies = random.sample(movies, k=5)
                movie_names = [movie['title'] for movie in recommended_movies]
                movie_list = "\n".join([f"{i+1}. {movie}" for i, movie in enumerate(movie_names)])
                response_text = f"here are some similar movies you might like:\n{movie_list}. Enjoy!"
                return response_text

                return movie_names
            else:
                return "No movie recommendations found for the specified genre."
        else:
            return None

    except requests.exceptions.RequestException:
        return None



def handle_intent(intent, movie_name):
    
    if intent == "imdb_rating":
        return get_imdb_rating(movie_name)
    
    elif intent == "get_director":
        return get_director(movie_name)
    
    elif intent == "movie_details":
        return get_movie_details_response(movie_name)
    elif intent == "release_date":
        return get_release_date(movie_name)
    
    elif intent == "get_overview":
        return get_overview(movie_name)
    
    elif intent == "get_runtime":
        return get_runtime(movie_name)
    
    elif intent == "get_language":
        return get_languages(movie_name)
    
    
    elif intent == "get_writers":
        return get_writers(movie_name)
    
    elif intent == "get_actors":
        return get_actors(movie_name)
    
    elif intent == "similar_movies":
        return get_similar_movies(movie_name)
    
   
  
    # elif intent == "get_actors" or 'get_actresses' or 'get_director' or 'writers':
    #     return get_credits_response(intent ,movie_name)
    
    # elif intent == "popularity" or "top_rated" or "upcoming" or "now_playing":
    #     return get_movie_info_response(intent)

    elif intent == "get_reviews":
        return get_reviews(movie_name)

    
    # elif intent == "trailers":
    #     return get_trailers(movie_name)
    
    # elif intent == "box_office":
    #     return get_box_office_response(movie_name)
    
    # elif intent == "genres":
    #     return get_genres_response(movie_name)

    else:
        return get_movie_details(movie_name)




import random  # Add this line to import the random module

@app.route('/', methods=['POST'])
def get_chatbot_response():
    data = request.get_json()
    movie_name = data['queryResult']['parameters'].get('movie_name')
    intent = data['queryResult']['intent']['displayName']
    genre_name = data['queryResult']['parameters'].get('genre_name')

    if genre_name:
        response_text = get_movie_recommendations(genre_name)
    elif movie_name:
        response_text = handle_intent(intent, movie_name)
    else:
        response_text = "I'm sorry, but I couldn't understand your request."

    res = {
        'fulfillmentText': response_text
    }

    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True)

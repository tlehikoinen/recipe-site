# Recipe site developed with MERN stack  

## Deployed to Render.com
https://resepti-mern.onrender.com/  

Web Services on the free plan are automatically spun down after 15 minutes of inactivity. When a new request for a free service comes in, Render spins it up again so it can process the request.

This can cause a response delay of up to 90 seconds for the first request that comes in after a period of inactivity.  

## 


## Features  
- Register and login
- Add new recipe or edit existing one
- Comment, like and scale recipes by other users
- Search recipes with various filtering options
- Recipes / account can be deleted  


## Pictures  
#### Register and welcome page (mobile view)  
<img src="https://github.com/tlehikoinen/recipe-site/blob/main/pics/create_account_phone.JPG?raw=true" height=400px, width=200x>&nbsp; <img src="https://github.com/tlehikoinen/recipe-site/blob/main/pics/welcome_phone.JPG?raw=true" height=400px, width=200x>  

#### Recipes and users page (tablet view) 
<img src="https://github.com/tlehikoinen/recipe-site/blob/main/pics/recipes.JPG?raw=true" height=400px, width=275x>&nbsp; <img src="https://github.com/tlehikoinen/recipe-site/blob/main/pics/users.JPG?raw=true" height=400px, width=275x>

#### Add and edit recipe pages (tablet view) 
<img src="https://github.com/tlehikoinen/recipe-site/blob/main/pics/add_recipe.JPG?raw=true" height=400px, width=275x>&nbsp; <img src="https://github.com/tlehikoinen/recipe-site/blob/main/pics/edit_recipe.JPG?raw=true" height=400px, width=275x>



## Run in Docker
Change frontend/package.json proxy value to http://backend:5000/  

docker-compose build  
docker-compose up  

Frontend @ localhost:3000  
Backend @ localhost:5000  
MongoDB @ localhost:27017  
LocalStack S3 @ localhost:4566  

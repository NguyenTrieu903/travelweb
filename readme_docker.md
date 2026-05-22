docker-compose build app
docker-compose up -d
docker exec -it travel_app bash

php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear



composer install
php artisan key:generate


php artisan migrate
php artisan db:seed   # nếu có seed
php artisan storage:link

# run APP
php artisan serve

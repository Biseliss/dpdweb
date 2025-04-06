# Frontend for project

## Deploying
0. Make sure that you have already installed:
```
web server (apache2, nginx, etc.)
git
```
1. Clone the repository
```
git clone https://github.com/Biseliss/dpdweb.git && cd dpdweb
```
2. Configure api connection
    1. Set api url in file [js/config.js.example](./js/config.js.example)
    2. Rename the config file to `config.js`

3. Configure web server
    1. Copy the content of the repository to your web server root directory (e.g. `/var/www/html/`)
    2. Set permissions for the web server user (e.g. `www-data`):

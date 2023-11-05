#open a location you can easily acess on your file structure
cd /path to your loaction
#create a project directory at that location
mkdir project
#open the folder
cd project
#create a server directory
mkdir server
#open server folder
cd server
#create a php file for the server
gedit index.php
#paste the server php code form the project repo in this file and save the file


#sudo lsof -i :port number --> gives the port user
#mysql:3306
#php:8000(not fixed but i use this)
#grafana:3000
#To see if firewall is running
sudo ufw status
#Allow port that you are using for php webserver in my case i am using 8000
sudo ufw allow 8000


#update your system
sudo apt update
#install apcahe webserver
sudo apt install apache2
#start apache
sudo service apache2 start
#enable apache to start at boot
sudo systemctl enable apache2
#check if it is up and running
sudo systemctl status apache2




#update the system
sudo apt update
#install php
sudo apt install php
#check if  installation is sucessfull
php -v


#once you have fimished setting up the server ,to run teh php file use the following command,
cd /path/to/the/folder/directory/where/you/have/your/php/file/for/the/server
#it is a good practice to create a seperate folder for your server as mentioned above
#run this to start the server,you will see all the incomming http requests on the terminal now
php -S 0.0.0.0:8000


#update the system
sudo apt update
#install mysql server and client
sudo apt install mysql-server
sudo apt install mysql-client
#start mysql
sudo systemctl start mysql
#enable it at boot
sudo systemctl enable mysql
#check if it is up and running
sudo systemctl status mysql
#setup mysql installation
sudo mysql_secure_installation
#open mysql and check if setup is sucessfull
sudo mysql -u root -p
#install the php mysql extension ,if not installed
sudo apt install php-mysql

#!/bin/sh
#iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 4000 
forever start ./bin/www

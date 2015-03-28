#!/bin/bash

nwX=26.1962553
nwY=-81.8161969
X=0.0143900
Y=0.0160968

for l in `seq 0 10`
do
  for i in `seq 0 10`
  do
    z=$(echo "$i + 1"|bc -l)
    a=$(echo "$l + 1"|bc -l)
    lat1="$(echo "$nwX - $X * $l"|bc -l)"
    long1="$(echo "$nwY + $Y * $i"|bc -l)"
    lat2="$(echo "$nwX - $X * $a"|bc -l)"
    long2="$(echo "$nwY + $Y * $z"|bc -l)"

    echo "{'trs':'$l x $i','lat1':'$lat1','long1':'$long1','lat2':'$lat2','long2':'$long2'})"
  done
done

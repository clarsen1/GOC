#!/bin/bash 
# The following keys will get replaced when the shell script is ran. 
# Fill in the keys that you wish to be replaced. 

SCRIPT=$(readlink -f "$0")
base_dir=$(dirname "$SCRIPT")
this_dir=$(basename "$PWD")
apache_dir="/var/www/html"

key_vals[0]="drupal"  		 #%db_name%
key_vals[1]="drupal"  		 #%db_user%
key_vals[2]="drupal"  		 #%db_password%
key_vals[3]="localhost"  		 #%db_host%
key_vals[4]="3306"  		 #%db_port%
key_vals[5]="mysql"  		 #%db_type%
key_vals[6]="/$this_dir/"  		 #%dir_platform%
key_vals[7]="$this_dir/config-include/includes"  		 #%dir_aegir_config_includes%
key_vals[8]="$apache_dir"  		 #%dir_apache_key%



# Do not edit anything below here 
keys[0]="%db_name%"
keys[1]="%db_user%"
keys[2]="%db_password%"
keys[3]="%db_host%"
keys[4]="%db_port%"
keys[5]="%db_type%"
keys[6]="%dir_platform%"
keys[7]="%dir_aegir_config_includes%"
keys[8]="%dir_apache_key%"

files[0]="goc-prod-7.38-06232015/sites/goc1.uoregon.edu/drushrc.php"
files[1]="goc-prod-7.38-06232015/sites/goc1.uoregon.edu/settings.php"
files[2]="vhost.conf"



#Start of script
makefile_file=""
sitebackup_file="site-backup"
vhost_file=""
readme_file=""
aegir_config_include_file="config-include"

keys_length=${#keys[*]}
key_vals_length=${#key_vals[*]}
files_length=${#files[*]}

#Check the config to see if we have a uneven number of keys and values
if [[ "$keys_length" == "$key_vals_length" ]]
then
  #If they are not the same
  echo "The config checks ok"
else
  echo "The config does not have the same keys as key values, exiting"
  exit 2
fi


#Replace all of the keys with the values (the config part)
typeset -i i END
let END=$keys_length i=0
while ((i<END))
do
  typeset -i k END2
  let END2=$files_length k=0
  while ((k<END2))
  do
    key="${keys[i]}"
    key_val="${key_vals[i]}"
    check_filename="${files[k]}"

    sed -i "s|$key|$key_val|g" "$check_filename"
    let k++
  done
  let i++
done


rm setup.sh
rm readme.me

echo "Finished" 

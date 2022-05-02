echo ****************************************
echo * Забрать права на проект   
echo * Паша Щербуха: okd-izz000c
echo * Женя Хищенко  okd-u54617
echo * Макс Бобин:    okd-u14369
echo * Олег Швец:     okd-zz003l
echo ****************************************


rem oc adm policy remove-role-from-user edit okd-u54617
rem oc adm policy remove-role-from-user admin okd-u54617

oc adm policy remove-role-from-user admin okd-izz000c -n %PRJ-NAME%
oc adm policy remove-role-from-user admin okd-u54617 -n %PRJ-NAME%
oc adm policy remove-role-from-user admin okd-u14369 -n %PRJ-NAME%
oc adm policy remove-role-from-user admin okd-zz003l -n %PRJ-NAME%
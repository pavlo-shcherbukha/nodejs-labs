echo ****************************************
echo * Grant access to other developers   
echo * Паша Щербуха:  okd-izz000c
echo * Женя Хищенко:  okd-u54617
echo * Макс Бобин:    okd-u14369
echo * Олег Швец:     okd-zz003l
echo * Альтернативный вариант
echo * for 3.11 oc adm policy add-role-to-user admin okd-izz000c okd-u14369 okd-zz003l
echo * oc adm policy add-role-to-user [role] [user] -n [project]
echo * oc describe rolebinding.rbac -n [project]
echo ****************************************


oc adm policy add-role-to-user admin okd-izz000c -n %PRJ-NAME%
oc adm policy add-role-to-user admin okd-u54617 -n %PRJ-NAME%  
oc adm policy add-role-to-user admin okd-u14369 -n %PRJ-NAME% 
oc adm policy add-role-to-user admin okd-zz003l -n %PRJ-NAME% 






echo ****************************************
echo *    create secret to pravex git lab
echo * 
echo ****************************************

oc create secret generic sinc-gitlab-pvx-1 --from-literal=username=ZZ000C --from-literal=password=2qkXrU-qVb6f2aJypgQL

oc secrets link deployer sinc-gitlab-pvx-1  
oc secrets link builder sinc-gitlab-pvx-1

oc annotate secret sinc-gitlab-pvx-1 "build.openshift.io/source-secret-match-uri-1=http://int-ifc-mb10-as.pravex.ua/Node.JS_PROJECTS/*"

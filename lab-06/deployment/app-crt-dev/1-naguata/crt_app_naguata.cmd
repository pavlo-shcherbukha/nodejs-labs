echo ****************************************
echo *    create  (работает)
echo ****************************************


oc login --token=KQGAj8dqPAAIO1XqpiMA9YgvVS1BPhIxYKjz3mk_8e8 --server=https://api.okd4-cl-01.openshift.pravex.ua:6443
oc project izz000c-bnkdem-dev
oc delete all -l app=naguata
rem oc create -f naguata.yaml
rem oc new-app http://ZZ000C@int-ifc-mb10-as.pravex.ua/Node.JS_PROJECTS/pvx-naguata.git#tz_000001 --name="naguata" --env-file ./naguata.env --strategy=source --source-secret=sinc-gitlab-pvx-1 --image-stream=openshift/nodejs:10 -l app=naguata -o=yaml --dry-run=false
rem oc expose svc/naguata --hostname="naguata-bnkdem-dev.apps.okd4-cl-01.openshift.pravex.ua" --name="naguata-bnkdem-dev.apps.okd4-cl-01.openshift.pravex.ua" --port 8080 -l app=naguata -o=yaml --dry-run=false

oc new-app http://ZZ000C@int-ifc-mb10-as.pravex.ua/Node.JS_PROJECTS/pvx-naguata.git#tz_000001 --name="naguata" --env-file ./naguata.env --strategy=source --source-secret=sinc-gitlab-pvx-1 --image-stream=openshift/nodejs:10 -l app=naguata
oc expose svc/naguata --hostname="naguata-bnkdem-dev.apps.okd4-cl-01.openshift.pravex.ua" --name="naguata-bnkdem-dev.apps.okd4-cl-01.openshift.pravex.ua" --port 8080 -l app=naguata


pause


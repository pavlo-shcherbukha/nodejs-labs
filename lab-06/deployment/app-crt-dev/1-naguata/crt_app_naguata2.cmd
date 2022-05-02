echo ****************************************
echo *    create (шото не работает)
echo ****************************************


oc login --token=KQGAj8dqPAAIO1XqpiMA9YgvVS1BPhIxYKjz3mk_8e8 --server=https://api.okd4-cl-01.openshift.pravex.ua:6443
oc project izz000c-bnkdem-dev
oc delete all -l app=naguata
oc create -f naguata2.yaml
pause


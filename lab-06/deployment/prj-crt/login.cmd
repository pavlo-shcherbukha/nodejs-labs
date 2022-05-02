@echo off

echo **************************************************************
echo *            Login script on OPENSHIFT
echo **************************************************************
echo * oc login --server%OC_URL% --token=%OC_TOKEN%
echo * oc login --server%OC_URL% -u %OC_USER% -p %OC_PSW%
echo **************************************************************

REM set OC_URL=https://api.okd4-cl-01.openshift.pravex.ua:6443
REM set OC_TOKEN=29JE7U8SiF0bdU7Y-vnGUtwpjW5kvX2R1wZhL02a1Yk

echo *************************************************************
echo * Openshift CLI URL=%OC_URL%
echo ************************************************************* 

rem oc login --server%OC_URL% --token=%OC_TOKEN%
oc login --token= --server=https://api.okd4-cl-01.openshift.pravex.ua:6443
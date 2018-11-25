
cd %cd%
rd  .\apidoc_a\ /s /Q 
call apidoc -i .\a -o .\apidoc_a  -t D:\pg\tool\apidoc\template


sleep_ 1
::pause
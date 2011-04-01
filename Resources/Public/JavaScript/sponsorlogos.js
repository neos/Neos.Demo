/*
var i,j;
var maxEntrys = 10;
var OA_zones = new Object;

for (i =1; i<maxEntrys; i++) {
	for (j = 1; j < 8; j++) {
		OA_zones['z_' + j + '_' + i] = j;
	}	
}
*/

var openXParams;
   openXParams = document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : '');
   openXParams = openXParams + "&amp;loc=" + escape(window.location);
   if (document.referrer) openXParams = openXParams +  "&amp;referer=" + escape(document.referrer);
   if (document.context) openXParams = openXParams + "&context=" + escape(document.context);
   if (document.mmm_fo) openXParams = openXParams + "&amp;mmm_fo=1";
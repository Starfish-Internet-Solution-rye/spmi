<?php
require_once 'Project/ApplicationsFramework/MVC_superClasses/applicationsSuperController.php';
require_once 'loginView.php';
require_once FILE_ACCESS_CORE_CODE.'/Modules/Authorization/authorization.php';
require_once 'Project/Model/Settings/settings.php';
require_once 'Project/Model/UserAccount/UserAccount.php';

class loginController extends applicationsSuperController
{
	{
		if (isset($_POST['login']))
			//$password = sha1(md5($_POST['password']));
			if(settings::loginDummy($username, $password) == TRUE) {
	}
}
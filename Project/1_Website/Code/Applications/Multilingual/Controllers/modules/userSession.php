<?php 
require_once FILE_ACCESS_CORE_CODE.'/Modules/Authorization/authorization.php';

class userSession extends authorization
{
	public static function saveUserSession($language) 
	{
		Zend_Session::regenerateId();
		Zend_Session::rememberMe(172800);
		
		$user_session = new Zend_Session_Namespace("user_session");
		$user_session->language = $language;
	}
	
//=================================================================================================

	public static function getLanguage()
	{
		$user_info = new Zend_Session_Namespace('user_session');
		$user_info = unserialize(serialize($user_info));
		return $user_info->language;
	}
	
}
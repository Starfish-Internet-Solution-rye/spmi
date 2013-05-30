<?php
require_once 'Project/ApplicationsFramework/MVC_superClasses/applicationsSuperController.php';
require_once "Project/1_Website/Code/Applications/Multilingual/Controllers/modules/userSession.php";

class multilingualController extends applicationsSuperController
{
	public function changeLanguageAction()
	{
		$language = $this->getValueOfURLParameterPair('language');
		$location = $_GET['location'];
		
		
		if($language == 'chinese')
		{
			$exploded_location = explode("/", $location);
			
			if($exploded_location[1] == 'en')
			{
				unset($exploded_location[1]);
				$location = implode('/', $exploded_location);
			}
			
			if($exploded_location[1] != 'cn')
				header("Location: /cn$location");
			else
				header("Location: $location");
			
		}
		else
		{
			$exploded_location = explode("/", $location);
			unset($exploded_location[1]);
			$location = implode('/', $exploded_location);
			if($location == "")
				$location = '/';
			
			header("Location: $location");
		}
	}
	
}
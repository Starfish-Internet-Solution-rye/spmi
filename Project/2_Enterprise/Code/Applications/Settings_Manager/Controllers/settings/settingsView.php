<?php
require_once 'Project/ApplicationsFramework/MVC_superClasses/applicationsSuperView.php';

class settingsView extends applicationsSuperView
{
	private $templates_location;
	private $array_of_results;
	
	//-------------------------------------------------------------------------------------------------
	public function __get($field)
	{
		if(property_exists($this, $field)) return $this->{$field};
	
		else return NULL;
	}
	
	//-------------------------------------------------------------------------------------------------
	
	public function __set($field, $value) {
		if(property_exists($this, $field)) $this->{$field} = $value;
	}
	
	//-------------------------------------------------------------------------------------------------
	
	public function __construct()
	{
		$this->templates_location = 'Project/2_Enterprise/Design/Applications/Settings_Manager/Controllers/templates/settings/';
	}
	
//=================================================================================================

	public function displaySettingsContentColumn()
	{
		$content = $this->renderTemplate($this->templates_location.'settings_content_column.phtml');
		response::getInstance()->addContentToTree(array('CONTENT_COLUMN'=>$content));
	}
	 
//=================================================================================================

	 
}
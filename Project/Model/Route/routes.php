<?php 
/**
 * route.php
 * 
 * @copyright	Copyright (c) 2013 Amity Ruaro <amity.ruaro@starfi.sh>
 * @author		Amity Ruaro <amity.ruaro@starfi.sh>
 */
 
require_once 'Project/Model/DBSuperClass/DBQuery.php';
require_once 'route.php';

class routes
{
	private $route_id;
	private $permalink;
	private $page_id;

	/**
	 * gets value of a class property; returns NULL if property does not exists.
	 * @param string $field	proerty name in class
	 */
	public function __get($field)
	{
		if(property_exists($this, $field)) return $this->{$field};
		
		else return NULL;
	}
	
//-------------------------------------------------------------------------------------------------	
	/**
	 * sets value of a class property.
	 * @param string $field		proerty name in class
	 * @param ambiguous $value		value to store in property
	 */
	public function __set($field, $value) { if(property_exists($this, $field)) $this->{$field} = $value; }
	
	//-------------------------------------------------------------------------------------------------

	public function selectAll($columns = '*')
	{
		try
		{
			$pdo_connection = starfishDatabase::getConnection();
			
			$sql = "SELECT
						{$columns}
					FROM
						`route`
					WHERE
						`route_id` = :route_id";
				
			$pdo_statement = $pdo_connection->prepare($sql);
			$pdo_statement->execute();
				
			$results = $pdo_statement->fetchAll(PDO::FETCH_ASSOC);
			
			foreach($results as $result)
			{
				$route = new route();
						
				$this->route_id		= $result['route_id'];
				$this->permalink		= $result['permalink'];
				$this->page_id		= $result['page_id'];
			}
		}
		catch(PDOException $pdoe)
		{
			throw new Exception($pdoe);
		}
	}

}

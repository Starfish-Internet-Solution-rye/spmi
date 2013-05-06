<?php 
/**
 * route.php
 * 
 * @copyright	Copyright (c) 2013 Amity Ruaro <amity.ruaro@starfi.sh>
 * @author		Amity Ruaro <amity.ruaro@starfi.sh>
 */
 
require_once FILE_ACCESS_CORE_CODE.'/Modules/Database/starfishDatabase.php';

class route
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

	public function selectByPK($route_id, $columns = '*')
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
			$pdo_statement->bindParam(':route_id', $this->route_id, PDO::PARAM_INT);
			$pdo_statement->execute();
				
			$result = $pdo_statement->fetch(PDO::FETCH_ASSOC);
			
			$this->route_id		= $result['route_id'];
			$this->permalink		= $result['permalink'];
			$this->page_id		= $result['page_id'];
		}
		catch(PDOException $pdoe)
		{
			throw new Exception($pdoe);
		}
	}

//-------------------------------------------------------------------------------------------------

	public function insert()
	{
		try
		{
			$sql = "INSERT INTO
						`route`
						(
							`route_id`,
							`permalink`,
							`page_id`
						)
						VALUES
						(
							:route_id,
							:permalink,
							:page_id
						)
					";
				
			$pdo_statement = $pdo_connection->prepare($sql);
			$pdo_statement->bindParam(':route_id', $this->route_id, PDO::PARAM_STR);
			$pdo_statement->bindParam(':permalink', $this->permalink, PDO::PARAM_STR);
			$pdo_statement->bindParam(':page_id', $this->page_id, PDO::PARAM_STR);
			$pdo_statement->execute();
		}
		catch(PDOException $pdoe)
		{
			throw new Exception($pdoe);
		}
		
	}

//-------------------------------------------------------------------------------------------------

	public function update()
	{
		try
		{
			$sql = "UPDATE
						`route`
						SET
								`route_id` = :route_id,
							`permalink` = :permalink,
							`page_id` = :page_id
					";
				
			$pdo_statement = $pdo_connection->prepare($sql);
			$pdo_statement->bindParam(':route_id', $this->route_id, PDO::PARAM_STR);
			$pdo_statement->bindParam(':permalink', $this->permalink, PDO::PARAM_STR);
			$pdo_statement->bindParam(':page_id', $this->page_id, PDO::PARAM_STR);
			$pdo_statement->execute();
		}
		catch(PDOException $pdoe)
		{
			throw new Exception($pdoe);
		}
	}

//-------------------------------------------------------------------------------------------------

	public static function delete($route_id)
	{
		try
		{
			$sql = "DELETE FROM
						`route`
					WHERE
						`route_id` = :route_id";
				
			$pdo_statement = $pdo_connection->prepare($sql);
			$pdo_statement->bindParam(':route_id', $this->route_id, PDO::PARAM_INT);
			$pdo_statement->execute();
		}
		catch(PDOException $pdoe)
		{
			throw new Exception($pdoe);
		}
	}

}

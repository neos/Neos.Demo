<?php
namespace Neos\Flow\Persistence\Doctrine\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Rename from Neos.NeosDemoTypo3Org to Neos.Demo
 */
class Version20160427183550 extends AbstractMigration
{
    /**
     * @param Schema $schema
     * @return void
     */
    public function up(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "postgresql");

        $this->addSql("ALTER TABLE typo3_neosdemotypo3org_domain_model_registration RENAME TO neos_demo_domain_model_registration");
        $this->addSql("UPDATE typo3_neos_domain_model_site SET nodename = 'neosdemo', siteresourcespackagekey = 'Neos.Demo' WHERE nodename
= 'neosdemotypo3org'");
    }

    /**
     * @param Schema $schema
     * @return void
     */
    public function down(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "postgresql");

        $this->addSql("ALTER TABLE neos_demo_domain_model_registration RENAME TO typo3_neosdemotypo3org_domain_model_registration");
        $this->addSql("UPDATE typo3_neos_domain_model_site SET nodename = 'neosdemotypo3org', siteresourcespackagekey = 'Neos.NeosDemoTypo3Org' WHERE nodename
= 'neosdemo'");
    }
}

CREATE OR REPLACE FUNCTION add_default_todos()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO todo (user_id, title)
    VALUES 
        (NEW.id, 'Download Slack'),
        (New.id, 'Download Zoom'),
        (New.id, 'Download Postman'),
        (New.id, 'Download NVM (node)'),
        (New.id, 'Download Git'),
        (New.id, 'Download VSCode'),
        (New.id, 'Download Figma Desktop'),
        (New.id, 'Download Docker Desktop'),
        (New.id, 'Download Postico (Mac) or Dbeaver (Mac/Windows)'),
        (New.id, 'Set up Company Email'),
        (New.id, 'Set up Slack Channels'),
        (New.id, 'Set up VSCode extensions'),
        (New.id, 'Set up VSCode Setting'),
        (New.id, 'Set up Bitbucket repos and env'),
        (New.id, 'Set up VPN'),
        (New.id, 'Set up AWS profile'),
        (New.id, 'Get an access to Jira, Bitbucket');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION add_default_todos();
import Meta from '@/components/Meta';
import { BorderedCenteredFlexBox } from '@/components/styled';

function Help() {
  return (
    <>
      <Meta title="Help" />
      <BorderedCenteredFlexBox>
        <blockquote>
          <h1>Help page: </h1>
          <p>
            Hi and welcome to the help page, hopefully this will explain everything you need to know
            to use this app.
          </p>

          <h3>History page:</h3>
          <p>
            On this page you can see the history of all your documented episodes, from the most
            recent to the oldest.{' '}
          </p>

          <h3>Settings screen: </h3>
          <p>
            On the settings screen you can adjust the settings for different aspects of the app and
            update registered Treatments and Symptoms.
          </p>
          <h3>Treatments page:</h3>
          <p>
            On this page you can add, edit and delete different treatment options, like specific
            types of medicine or getting some sleep. These options will then become available as an
            option when adding an option.{' '}
          </p>
          <h3>Symptoms page:</h3>
          <p>
            On this page you can add, edit and delete different symptoms when an episode occurs.
            These options will then become available as an option when adding an option.{' '}
          </p>
          <h3>Treatments page:</h3>
          <p>
            On this page you can add, edit and delete different treatmentoptions. These options will
            then become available as an option when adding an option.{' '}
          </p>
        </blockquote>
      </BorderedCenteredFlexBox>
    </>
  );
}

export default Help;

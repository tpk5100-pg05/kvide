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

          <p>
            <h3> Home screen: </h3>
            Create new chronic pain events by pushing the circular plus button. A log of your most
            recent registered events will be visible, scroll to see previous instances.
          </p>

          <p>
            <h3> Add new event: </h3>
            Here you add new episodes, you can do the following:
            <br></br>
            Register a start and end time.
            <br></br>
            Grade the amount of pain from light (1) - Extreme (5).
            <br></br>
            Add symptoms from the registered Symptoms (Is found under settings then Symptoms).
            <br></br>
            Register which treatments were applied (Settings then Treatments).<br></br>
            Register the efficiancy of the used treatments from:<br></br>
            R: Relapse, N: No improvement or relapse, S: Some improvements, G: Good improvements.
            <br></br>
            Save button, to save and register the instance.
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

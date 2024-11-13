import { AddAppointmentButton } from './add-appointment-button';

describe('<AddAppointmentButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <AddAppointmentButton
        appointmentTypes={[]}
        label="Add Appointment"
        userEmail=""
      />,
    );
  });
});

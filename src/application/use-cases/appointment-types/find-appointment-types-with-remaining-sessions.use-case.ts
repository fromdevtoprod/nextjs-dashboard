import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { SelectedPackage } from '@/src/entities/models/package-model';
import { findAllAppointmentTypesUseCase } from './find-all-appointment-types.use-case';
import { findAllUncompletedPackagesUseCase } from '../packages/find-all-uncompleted-packages.use-case';

type SelectedAppointmentTypeWithPackage = SelectedAppointmentType & {
  package_id?: string;
};

export type AppointmentTypesWithRemainingSessions = {
  customerId: string;
  customerName: string;
  appointmentTypes: SelectedAppointmentTypeWithPackage[];
};

export async function findAppointmentTypesWithRemainingSessionsUseCase(
  clients: SelectedCustomer[],
): Promise<AppointmentTypesWithRemainingSessions[]> {
  const allAppointmentTypes = addPackageLabelInAppointmentTypes(
    await findAllAppointmentTypesUseCase(),
  );
  const allUncompletedPackages = await findAllUncompletedPackagesUseCase();

  const findUncompletedPackagesByClientId = findUncompletedPackagesByClient(
    allUncompletedPackages,
  );
  const findAppointmentTypeById = findAppointmentType(allAppointmentTypes);
  const getAllDefaultAppointments =
    getAllAppointmentByDefault(allAppointmentTypes);

  const filterAppointmentTypesByPackages = (
    uncompletedPackages: SelectedPackage[],
  ) => {
    const appointmentTypesPackages = uncompletedPackages.map(
      (uncompletedPackage) => {
        const appointmentTypePackage = findAppointmentTypeById(
          uncompletedPackage.appointment_type_id,
        );
        if (!appointmentTypePackage) {
          return null;
        }
        return {
          ...appointmentTypePackage,
          name: `${appointmentTypePackage.name} - ${uncompletedPackage.remaining_sessions} session(s) left`,
          package_id: uncompletedPackage.id,
        };
      },
    );
    return appointmentTypesPackages.filter(
      (appointmentType) => !!appointmentType,
    );
  };

  const removeDefaultAppointmentTypes =
    removeDefaultAppointmentTypesWhenSessionInProgress(allAppointmentTypes);

  return clients.map((client) => {
    const clientUncompletedPackages = findUncompletedPackagesByClientId(
      client.id,
    );
    if (clientUncompletedPackages.length === 0) {
      return getAllDefaultAppointments(client);
    }

    const appointmentTypesPackages = filterAppointmentTypesByPackages(
      clientUncompletedPackages,
    );
    if (appointmentTypesPackages.length === 0) {
      return getAllDefaultAppointments(client);
    }

    const defaultAppointmentTypesWithoutPackages =
      removeDefaultAppointmentTypes(appointmentTypesPackages);

    return {
      customerId: client.id,
      customerName: client.name,
      appointmentTypes: [
        ...appointmentTypesPackages,
        ...defaultAppointmentTypesWithoutPackages,
      ],
    };
  });
}

function removeDefaultAppointmentTypesWhenSessionInProgress(
  allAppointmentTypes: SelectedAppointmentType[],
) {
  return (appointmentTypesPackages: SelectedAppointmentType[]) => {
    return allAppointmentTypes.filter((appointmentType) => {
      return !appointmentTypesPackages.some(
        (appointmentTypePackage) =>
          appointmentType.id === appointmentTypePackage.id,
      );
    });
  };
}

function getAllAppointmentByDefault(
  allAppointmentTypes: SelectedAppointmentType[],
) {
  return (client: SelectedCustomer) => {
    return {
      customerId: client.id,
      customerName: client.name,
      appointmentTypes: [...allAppointmentTypes],
    };
  };
}

function findUncompletedPackagesByClient(
  allUncompletedPackages: SelectedPackage[],
) {
  return (clientId: string) => {
    return allUncompletedPackages.filter((uncompletedPackage) => {
      return uncompletedPackage.customer_id === clientId;
    });
  };
}

function findAppointmentType(allAppointmentTypes: SelectedAppointmentType[]) {
  return (appointmentTypeId: string) => {
    return allAppointmentTypes.find((appointmentType) => {
      return appointmentType.id === appointmentTypeId;
    });
  };
}

function addPackageLabelInAppointmentTypes(
  appointmentTypes: SelectedAppointmentType[],
) {
  return appointmentTypes.map((appointmentType) => {
    let { name } = appointmentType;
    if (appointmentType.session_count > 1) {
      name = `${name} (Package x${appointmentType.session_count}) `;
    }
    return {
      ...appointmentType,
      name,
    };
  });
}

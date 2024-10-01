import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { SelectedPackage } from '@/src/entities/models/package-model';
import { findAllAppointmentTypesUseCase } from './find-all-appointment-types.use-case';
import { findAllUncompletedPackagesUseCase } from '../packages/find-all-uncompleted-packages.use-case';

export type AppointmentTypesWithRemainingSessions = {
  customerId: string;
  customerName: string;
  appointmentTypes: SelectedAppointmentType[];
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
  const getAllAppointmentTypesResultByClient =
    getAllAppointmentTypesResult(allAppointmentTypes);

  const getAppointmentTypesPackages = (
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
        };
      },
    );
    return appointmentTypesPackages.filter(
      (appointmentType) => !!appointmentType,
    );
  };

  const filterAppointmentTypesByPackage =
    filterAppointmentTypes(allAppointmentTypes);

  return clients.map((client) => {
    const clientUncompletedPackages = findUncompletedPackagesByClientId(
      client.id,
    );
    if (clientUncompletedPackages.length === 0) {
      return getAllAppointmentTypesResultByClient(client);
    }

    const appointmentTypesPackages = getAppointmentTypesPackages(
      clientUncompletedPackages,
    );
    if (appointmentTypesPackages.length === 0) {
      return getAllAppointmentTypesResultByClient(client);
    }

    const filteredAppointmentTypes = filterAppointmentTypesByPackage(
      appointmentTypesPackages,
    );

    return {
      customerId: client.id,
      customerName: client.name,
      appointmentTypes: [
        ...appointmentTypesPackages,
        ...filteredAppointmentTypes,
      ],
    };
  });
}

function filterAppointmentTypes(
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

function getAllAppointmentTypesResult(
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

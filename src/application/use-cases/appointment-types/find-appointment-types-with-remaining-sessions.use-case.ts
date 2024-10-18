import { AppointmentType } from '@/src/entities/models/appointment-types';
import { Customer } from '@/src/entities/models/customer';
import { Package } from '@/src/entities/models/package-model';
import { findAllAppointmentTypesUseCase } from './find-all-appointment-types.use-case';
import { findAllUncompletedPackagesUseCase } from '../packages/find-all-uncompleted-packages.use-case';

export type AppointmentTypesWithRemainingSessions = {
  customerId: string;
  customerName: string;
  appointmentTypes: (
    | SelectedAppointmentTypeWithPackage
    | SelectedAppointmentTypeWithOptionalPackage
  )[];
};

type SelectedAppointmentTypeWithOptionalPackage = AppointmentType & {
  package_id?: string;
};

type SelectedAppointmentTypeWithPackage = AppointmentType & {
  package_id: string;
};

export async function findAppointmentTypesWithRemainingSessionsUseCase(
  clients: Customer[],
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

  const filterAppointmentTypesByPackages = (uncompletedPackages: Package[]) => {
    const appointmentTypesPackages = uncompletedPackages.map(
      (uncompletedPackage) => {
        const appointmentTypePackage = findAppointmentTypeById(
          uncompletedPackage.appointmentType.id,
        );
        if (!appointmentTypePackage) {
          console.error(
            `No appointment type found for ID: ${uncompletedPackage.appointmentType.id}`,
          );
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

    // Remove null values before moving forward
    const filteredAppointmentTypesPackages = appointmentTypesPackages.filter(
      (type): type is SelectedAppointmentTypeWithPackage => type !== null,
    );

    const defaultAppointmentTypesWithoutPackages =
      removeDefaultAppointmentTypes(filteredAppointmentTypesPackages);

    return {
      customerId: client.id,
      customerName: client.name,
      appointmentTypes: [
        ...filteredAppointmentTypesPackages,
        ...defaultAppointmentTypesWithoutPackages,
      ].filter(
        (type): type is SelectedAppointmentTypeWithPackage => type !== null,
      ),
    };
  });
}

function removeDefaultAppointmentTypesWhenSessionInProgress(
  allAppointmentTypes: AppointmentType[],
) {
  return (appointmentTypesPackages: AppointmentType[]) => {
    return allAppointmentTypes.filter((appointmentType) => {
      return !appointmentTypesPackages.some(
        (appointmentTypePackage) =>
          appointmentType.id === appointmentTypePackage.id,
      );
    });
  };
}

function getAllAppointmentByDefault(allAppointmentTypes: AppointmentType[]) {
  return (client: Customer) => {
    return {
      customerId: client.id,
      customerName: client.name,
      appointmentTypes: [...allAppointmentTypes],
    };
  };
}

function findUncompletedPackagesByClient(allUncompletedPackages: Package[]) {
  return (clientId: string) => {
    return allUncompletedPackages.filter((uncompletedPackage) => {
      return uncompletedPackage.customer.id === clientId;
    });
  };
}

function findAppointmentType(allAppointmentTypes: AppointmentType[]) {
  return (appointmentTypeId: string) => {
    return allAppointmentTypes.find((appointmentType) => {
      return appointmentType.id === appointmentTypeId;
    });
  };
}

function addPackageLabelInAppointmentTypes(
  appointmentTypes: AppointmentType[],
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

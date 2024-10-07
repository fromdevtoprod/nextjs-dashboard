import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type EditPaymentDialogProps = {
  amount: number;
  date: string;
  id: string;
  isOpen: boolean;
  method: string;
  packageId: string;
  status: string;
  onDialogSubmit: (data: any) => void;
  onOpenChange: () => void;
};

export function EditPaymentDialog({
  amount,
  date,
  id,
  isOpen,
  method,
  packageId,
  status,
  onDialogSubmit,
  onOpenChange,
}: EditPaymentDialogProps) {
  // const { toast } = useToast();

  // const handleOpenChange = () => {
  //   onOpenChange(!isOpen);
  // };

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    // let updateCustomerPayload;
    // try {
    //   setIsLoading(true);
    //   // @ts-ignore
    //   const formData = new FormData(event.target);
    //   updateCustomerPayload = updateCustomerController(id, formData);
    // } catch (error: any) {
    //   setEmailOrPhoneError(error.message);
    //   setIsLoading(false);
    // }

    // if (!updateCustomerPayload) {
    //   return;
    // }

    // try {
    //   await updateClient(updateCustomerPayload);
    //   onDialogSubmit(updateCustomerPayload);
    // } catch (error) {
    //   console.error(error);
    //   toast({
    //     description: 'We could not update this client.',
    //     title: 'Sorry, something went wrong !',
    //     variant: 'destructive',
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Payment</DialogTitle>
          <DialogDescription>
            Update the details of the payment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmission}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                Type
              </Label>
              <Select
                name="type"
                defaultValue={packageId ? 'Package' : 'Appointment'}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Appointment">Appointment</SelectItem>
                  <SelectItem value="Package">Package</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-amount" className="text-right">
                Amount
              </Label>
              <Input
                id="edit-amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={amount}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-date" className="text-right">
                Date
              </Label>
              <Input
                id="edit-date"
                name="date"
                type="date"
                defaultValue={date}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

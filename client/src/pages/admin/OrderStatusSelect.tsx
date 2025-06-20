
import { useMutation } from "@tanstack/react-query";
import type { Order } from "@shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { constants } from "@/lib/utils";

interface OrderStatusSelectProps {
  order: Order;
}

export const OrderStatusSelect = ({ order }: OrderStatusSelectProps) => {
  const { toast } = useToast();

  const { mutate: updateStatus } = useMutation({
    mutationFn: async (status: string) => {
      const res = await apiRequest("PATCH", `/api/orders/${order.id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Select defaultValue={order.status} onValueChange={(value) => updateStatus(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(constants.orderStatuses).map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
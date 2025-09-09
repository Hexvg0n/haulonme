import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Link as LinkIcon } from "lucide-react"
import type { PhotoRequest } from "@/types"

interface RequestsTableProps {
  requests: PhotoRequest[]
  onDelete: (requestId: string) => void
}

export function RequestsTable({ requests, onDelete }: RequestsTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Requester</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Item Name</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Category</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Description</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Reference Links</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{request.name}</div>
                    <div className="text-sm text-gray-500">{request.email}</div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-800">{request.itemName}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{request.category}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 max-w-xs truncate" title={request.description}>{request.description}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {request.referenceLinks ? (
                      <div className="flex items-center gap-1">
                        <LinkIcon className="h-4 w-4" />
                        <span>{request.referenceLinks.split('\n')[0]}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => onDelete(request._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
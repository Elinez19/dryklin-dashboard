import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ChevronDown, ChevronUp, X } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface FormikErrorsDisplayProps {
  formErrors: string[];
  isErrorsPanelOpen: boolean;
  toggleErrorsPanel: () => void;
}

const FormikErrorsDisplay = ({
  formErrors,
  isErrorsPanelOpen,
  toggleErrorsPanel,
}: FormikErrorsDisplayProps) => {
  const [isMobileView, setIsMobileView] = useState(false);

  // Check for mobile view on mount and window resize
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Initial check
    checkMobileView();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobileView);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  return (
    <div>
      {/* Mobile Error Alert - Sticky bottom button */}
      {formErrors.length > 0 && isMobileView && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-red-900/80 p-3 z-50 border-t border-red-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={toggleErrorsPanel}
            className="w-full flex items-center justify-between text-white"
            type="button"
          >
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-300 mr-2" />
              <span className="font-medium">
                {formErrors.length}{" "}
                {formErrors.length === 1 ? "Error" : "Errors"} Found
              </span>
            </div>
            {isErrorsPanelOpen ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
          </button>
        </motion.div>
      )}

      {/* Desktop Error Display Panel */}
      {formErrors.length > 0 && !isMobileView && (
        <motion.div
          className="hidden lg:block w-80 bg-gray-800/50 p-4 shadow-lg pt-[104px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="sticky top-[104px]">
            <h3 className="text-lg font-medium text-white flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              Form Validation Errors
            </h3>

            <Alert className="dark:bg-red-900/30 dark:border-red-800 mb-4">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertTitle className="text-red-300">
                Attention Required
              </AlertTitle>
              <AlertDescription className="text-red-200">
                Please fix the following errors before submitting:
              </AlertDescription>
            </Alert>

            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
              {formErrors.map((error, index) => (
                <div
                  key={index}
                  className="p-2 bg-red-900/20 border border-red-800/40 rounded text-red-200 text-sm"
                >
                  {error}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Errors Panel - Full Screen Overlay */}
      {formErrors.length > 0 && isMobileView && isErrorsPanelOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900/95 z-50 overflow-y-auto p-4 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative max-w-lg mx-auto">
            <button
              onClick={toggleErrorsPanel}
              className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white"
              type="button"
              aria-label="Close errors panel"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="text-xl font-medium text-white flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-2" />
              Form Validation Errors
            </h3>

            <Alert className="dark:bg-red-900/30 dark:border-red-800 mb-4">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertTitle className="text-red-300">
                Attention Required
              </AlertTitle>
              <AlertDescription className="text-red-200">
                Please fix the following errors before submitting:
              </AlertDescription>
            </Alert>

            <div className="space-y-3 mb-16">
              {formErrors.map((error, index) => (
                <div
                  key={index}
                  className="p-3 bg-red-900/20 border border-red-800/40 rounded-md text-red-200 text-sm"
                >
                  {error}
                </div>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 border-t border-gray-800">
              <Button
                onClick={toggleErrorsPanel}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                type="button"
              >
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FormikErrorsDisplay;

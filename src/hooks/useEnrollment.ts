import { useState, useCallback } from 'react';
import { EnrollmentService, Enrollment } from '../services/enrollments';
import { AppError } from '../utils/errors';

interface UseEnrollmentState {
  loading: boolean;
  error: AppError | null;
  success: boolean;
}

export function useEnrollment() {
  const [state, setState] = useState<UseEnrollmentState>({
    loading: false,
    error: null,
    success: false
  });

  const submitAmbassadorEnrollment = useCallback(async (formData: any) => {
    setState({ loading: true, error: null, success: false });
    try {
      const enrollment = {
        type: 'ambassador',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        church: formData.church,
        commitments: formData.commitments,
        socialPlatforms: formData.socialPlatforms,
        engagementLevel: formData.engagementLevel
      };

      await EnrollmentService.createAmbassadorEnrollment(enrollment);
      setState({ loading: false, error: null, success: true });
    } catch (error) {
      setState({
        loading: false,
        error: new AppError(error instanceof Error ? error.message : 'Failed to submit enrollment'),
        success: false
      });
    }
  }, []);

  const submitBusinessEnrollment = useCallback(async (formData: any) => {
    setState({ loading: true, error: null, success: false });
    try {
      const enrollment = {
        type: 'business',
        firstName: formData.contactName.split(' ')[0],
        lastName: formData.contactName.split(' ').slice(1).join(' '),
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        website: formData.website,
        address: formData.address,
        description: formData.description,
        supportType: formData.supportType,
        engagementLevel: formData.engagementLevel
      };

      await EnrollmentService.createBusinessEnrollment(enrollment);
      setState({ loading: false, error: null, success: true });
    } catch (error) {
      setState({
        loading: false,
        error: new AppError(error instanceof Error ? error.message : 'Failed to submit enrollment'),
        success: false
      });
    }
  }, []);

  const submitSubscriberEnrollment = useCallback(async (formData: any) => {
    setState({ loading: true, error: null, success: false });
    try {
      const enrollment = {
        type: 'subscriber',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        subscriptionTier: formData.tier,
        paymentMethod: formData.paymentMethod,
        billingAddress: formData.billingAddress
      };

      await EnrollmentService.createSubscriberEnrollment(enrollment);
      setState({ loading: false, error: null, success: true });
    } catch (error) {
      setState({
        loading: false,
        error: new AppError(error instanceof Error ? error.message : 'Failed to submit enrollment'),
        success: false
      });
    }
  }, []);

  return {
    ...state,
    submitAmbassadorEnrollment,
    submitBusinessEnrollment,
    submitSubscriberEnrollment
  };
}
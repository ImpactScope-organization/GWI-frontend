import { renderHook, act } from '@testing-library/react'
import { useCompanyDocumentInput } from './useCompanyDocumentInput'
import { useGetCompanyDocuments } from '../../../../api/CompanyApiQuery'

const mockInputName = 'documents'

const mockFormikContextValue = jest.fn()
const mockSetFieldValue = jest.fn()

const mock2023Documents = [
  { documentId: 1, reportType: 'B', year: 2023 },
  { documentId: 2, reportType: 'A', year: 2023 }
]

const mock2022Documents = [{ documentId: 3, reportType: 'C', year: 2022 }]

const mockFlattenedCompanyDocuments = [...mock2023Documents, ...mock2022Documents]

jest.mock('formik', () => ({
  useFormikContext: () => ({
    values: { [mockInputName]: mockFormikContextValue() },
    setFieldValue: mockSetFieldValue
  })
}))

jest.mock('../../../../api/CompanyApiQuery', () => ({
  useGetCompanyDocuments: jest.fn()
}))

describe('useCompanyDocumentInput', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFormikContextValue.mockReturnValue([])
    useGetCompanyDocuments.mockReturnValue({
      companyDocuments: [
        {
          year: 2023,
          documents: mock2023Documents
        },
        { year: 2022, documents: mock2022Documents }
      ]
    })
  })

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

    expect(result.current.hasDocuments).toBe(false)
    expect(result.current.companyDocuments).toHaveLength(2)
    expect(result.current.yearDocuments).toEqual([])
  })

  describe('flattenedCompanyDocuments', () => {
    it('should flatten company documents', () => {
      const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

      expect(result.current.flattenedCompanyDocuments).toEqual(mockFlattenedCompanyDocuments)
    })
  })

  describe('yearDocuments', () => {
    it('should list active year yearDocuments', () => {
      const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

      act(() => {
        result.current.setYear(2022)
      })

      expect(result.current.yearDocuments).toEqual(mock2022Documents)
    })
    it('should sort yearDocuments', () => {
      const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

      act(() => {
        result.current.setYear(2023)
      })

      expect(result.current.yearDocuments).toEqual(mock2023Documents)
    })
  })

  describe('currentCompanyDocuments', () => {
    it('should list current company documents', () => {
      mockFormikContextValue.mockReturnValue([
        mockFlattenedCompanyDocuments[0].documentId,
        mockFlattenedCompanyDocuments[2].documentId
      ])
      const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

      expect(result.current.currentCompanyDocuments).toEqual([
        mockFlattenedCompanyDocuments[0],
        mockFlattenedCompanyDocuments[2]
      ])
    })
  })

  describe('handleAddDocument', () => {
    it('should add a document', () => {
      const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

      act(() => {
        result.current.setYearDocument(1)
      })

      act(() => {
        result.current.handleAddDocument()
      })

      expect(mockSetFieldValue).toHaveBeenCalledWith('documents', [1])
    })
  })

  describe('handleRemoveDocument', () => {
    it('should remove a document', () => {
      mockFormikContextValue.mockReturnValue([1, 2])

      const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

      act(() => {
        result.current.handleRemoveDocument(1)
      })

      expect(mockSetFieldValue).toHaveBeenCalledWith('documents', [2])
    })
  })
})

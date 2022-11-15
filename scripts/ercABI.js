export default {
    20: [
        'function balanceOf(address owner) view returns (uint balance)',
        'function symbol() public view returns (string)',
        'function allowance(address owner, address spender) external view returns (uint256)',
        'function approve(address spender, uint256 amount) external returns (bool)'
    ],
    721: [
        'function balanceOf(address owner) view returns (uint balance)',
        'function symbol() public view returns (string)',
        'function approve(address to, uint256 tokenId) external',
        'function setApprovalForAll(address operator, bool _approved) external',
        'function getApproved(uint256 tokenId) external view returns (address operator)',
        'function isApprovedForAll(address owner, address operator) external view returns (bool)'
    ],
}